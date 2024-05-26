import { Component, Inject } from '@angular/core';
import { AppServiceModule } from '../../app-service.module';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { BookingShowDto } from '../../interfaces/booking-show-dto';


@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
  constructor(private service: AppServiceModule = Inject(AppServiceModule),private aRoute: ActivatedRoute,
    private router: Router   ){}
  customerId?: number;
  roomId?: number
  customerName?: string
  roomCode?: string
  dateFrom: string= ""
  dateTo: string = ""
  bookings?: BookingShowDto[];
  errors: any


  form = new FormGroup({
    dateFrom: new FormControl(),
    dateTo : new FormControl()
  })

  ngOnInit(){
    let todayMs = new Date().getTime();
    console.log(todayMs);
    let dtDateFrom = new Date(todayMs - 90*24*60*60*1000);
    let dtDateTo =new Date( todayMs + 90*24*60*60*1000);
    this.dateFrom = formatDate(dtDateFrom, "yyyy-MM-dd","en");
    this.dateTo = formatDate(dtDateTo, "yyyy-MM-dd", "en");
    this.customerId = Number(this.aRoute.snapshot.queryParams["customerId"])
    this.roomId = Number(this.aRoute.snapshot.queryParams['roomId'])
    this.form.patchValue({dateFrom: this.dateFrom, dateTo: this.dateTo})
    this.getBookings()

    }

    getBookings(){
      if(this.customerId){
        
        this.service.getCustomer(this.customerId).subscribe({
          next: data => this.customerName = data.givenName + " " + data.surname,
          error: err => this.errors = err
        })
        this.service.getCustomerBooking(this.customerId, this.dateFrom, this.dateTo).subscribe({
          next: data => this.bookings = data,
          error: err => this.errors = err
        })
      }else if(this.roomId){
        this.service.getRoomById(this.roomId).subscribe({
          next: data => this.roomCode = data.code,
          error: err => this.errors = err
        })
        this.service.getRoomBookings(this.roomId, this.dateFrom, this.dateTo).subscribe({
          next: data => this.bookings = data,
          error: err => this.errors = err
        })
      }else{
        this.errors = "Error. No parameters set"
      }
    }

    submitSearch(){
      this.dateFrom = this.form.controls['dateFrom'].value
      this.dateTo = this.form.controls['dateTo'].value
      this.getBookings()
    }

    canceBooking(bookingId: number){
      
      let bookingToDelete: BookingShowDto|undefined = this.bookings?.find(b => b.id == bookingId);
      
      let index = this.bookings?.findIndex(b => b.id == bookingId)
      if(!index) index = -1;
      let confirmed: boolean = false;
      if(bookingToDelete){
        let startDate = new Date(bookingToDelete.dateFrom)
        let currentDate = new Date();
        if(startDate < currentDate) {
          confirmed = confirm("The requested booking is for a past period. Do you want to delete it anyway?");
        }else{
          confirmed = true;
        }
      }
      if(confirmed){
        this.service.deleteBooking(bookingId).subscribe({
          next: data =>{
            this.errors = undefined;
            this.bookings?.splice(index,1);
          },
          error: err => {
            this.errors = err;
          }
        })
      }
    }
    
    
  }


