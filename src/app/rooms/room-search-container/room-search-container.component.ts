import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { AppServiceModule } from '../../app-service.module';
import { RoomShowDto } from '../../interfaces/room-show-dto';
import { RoomSearchDto } from '../../interfaces/room-search-dto';
import { CommonModule } from '@angular/common';
import { RoomSearchFormComponent } from '../room-search-form/room-search-form.component';
import { RoomSearchResultsComponent } from '../room-search-results/room-search-results.component';
import { DateSpanDTO } from '../../interfaces/date-span-dto';
import { Router, RouterLink } from '@angular/router';
import { ConfirmBookingDatesComponent } from '../confirm-booking-dates/confirm-booking-dates.component';
import { RoomBookingDetails } from '../../interfaces/room-booking-details';


@Component({
  selector: 'app-room-search-container',
  standalone: true,
  imports: [CommonModule, RoomSearchFormComponent, RoomSearchResultsComponent, ConfirmBookingDatesComponent],
  templateUrl: './room-search-container.component.html',
  styleUrl: './room-search-container.component.css'
})
export class RoomSearchContainerComponent {
  rooms?:RoomShowDto[]
  errors: any
 
 @Input() embedded: boolean = false;
 @Output() onBook = new EventEmitter<RoomBookingDetails>();
  bookingRoom?: RoomShowDto;
  bookingPeriod?: DateSpanDTO;
  roomAvailable:boolean= true
  

  constructor(private service: AppServiceModule = Inject(AppServiceModule), private router: Router){}

  userType$ = this.service.userType
  searchRooms(criteria: RoomSearchDto){
    this.service.searchRooms(criteria).subscribe({
      next: data =>{
        this.errors = undefined;
        this.rooms = data;
        this.rooms.sort((a,b) => a.code.localeCompare(b.code) )
      
        this.bookingPeriod = {dateFrom : criteria.dateFrom, dateTo: criteria.dateTo}
      },
      error: err =>{
        this.errors = err
      }
    })
  }

  getRoomByCode(code: string){
    this.service.getRoomByCode(code).subscribe({
      next: data =>
      {
        // this.rooms= [];
        // this.rooms.push(data);
        this.rooms = [data];
       
        this.errors = undefined;
      },
      error: err =>{
        this.errors = err;
      }
    })
  }

  selectRoomForBooking(room: RoomShowDto){
    this.bookingRoom = room
  }

  bookRoom(period: DateSpanDTO){
    if(!this.bookingRoom?.id || !period.dateFrom ||!period.dateTo) return;
     this.service.checkRoomAvailability(this.bookingRoom.id, period.dateFrom, period.dateTo).subscribe({
      next: data =>{
         this.roomAvailable = (data.isAvailable=="True");
        console.log(data)
        if(this.roomAvailable){
          console.log("2 Available " + this.roomAvailable)
          
          if(this.embedded){
            let bookingDetails: RoomBookingDetails = {room : this.bookingRoom, dateFrom: period.dateFrom, dateTo: period.dateTo}
            this.onBook.emit(bookingDetails);
          }else{
            this.router.navigate(['/BookingEdit'],{queryParams: {roomId: this.bookingRoom?.id, dateFrom: period.dateFrom, dateTo: period.dateTo}})
          }
        }
         
      }
    })
    
  }

  
  cancelBooking(){
      this.bookingRoom = undefined
      this.roomAvailable = true
  }

  deleteRoom(roomId: number){
    let index = this.rooms?.findIndex(r => r.id == roomId);
    if(!index) index = -1;

    this.service.deleteRoom(roomId).subscribe({
      next: data =>{
        this.errors = undefined;
        this.rooms?.splice(index, 1);
      },
      error: err =>{
        this.errors = err;
      }
    })

  }
}
