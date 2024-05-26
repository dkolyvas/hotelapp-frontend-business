import { Component, EventEmitter, Inject } from '@angular/core';
import { AppServiceModule } from '../../app-service.module';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomShowDto } from '../../interfaces/room-show-dto';
import { CustomerShowDto } from '../../interfaces/customer-show-dto';
import { BookingShowDto } from '../../interfaces/booking-show-dto';
import { Observable } from 'rxjs';
import { PricingPolicyShowDto } from '../../interfaces/pricing-policy-show-dto';
import { BookingInsertDto } from '../../interfaces/booking-insert-dto';
import { BookingUpdateDto } from '../../interfaces/booking-update-dto';
import { RoomBookingDetails } from '../../interfaces/room-booking-details';
import { CustomerSearchContainerComponent } from '../../customers/customer-search-container/customer-search-container.component';
import { RoomSearchContainerComponent } from '../../rooms/room-search-container/room-search-container.component';

@Component({
  selector: 'app-booking-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CustomerSearchContainerComponent, RoomSearchContainerComponent],
  templateUrl: './booking-edit.component.html',
  styleUrl: './booking-edit.component.css'
})
export class BookingEditComponent {
  constructor(private service: AppServiceModule = Inject(AppServiceModule), private aroute: ActivatedRoute){}
  booking?: BookingShowDto;
  room?: RoomShowDto
  customer? : CustomerShowDto
  pricingPolicies?: PricingPolicyShowDto[]
  message?: string
  
  dateFrom?: string
  dateTo?: string
  errors: any

  form = new FormGroup({
    pricingPolicy : new FormControl()
  })

  


  ngOnInit(){
    let bookingId: number|undefined;
    let customerId: number|undefined;
    let roomId: number|undefined;
    
    
      bookingId= Number(this.aroute.snapshot.queryParams['bookingId'])
  
      roomId = Number(this.aroute.snapshot.queryParams['roomId'])
      
      this.dateFrom = this.aroute.snapshot.queryParams['dateFrom']
      this.dateTo = this.aroute.snapshot.queryParams['dateTo']
      customerId = this.aroute.snapshot.queryParams['customerId']

    if(bookingId){
      this.service.getBooking(bookingId).subscribe({
        next: data =>{
          console.log(data)
          this.booking = data;
          this.dateFrom = data.dateFrom
          this.dateTo = data.dateTo
          this.selectCustomerById(data.customerId)
          this.selectRoomById(data.roomId)
        },
        error: err =>{
            this.errors = err;
        }
      })
 

    }
    if(customerId){
      console.log(customerId)
      this.selectCustomerById(customerId)
    }
    if(roomId){
      console.log(roomId)
      this.selectRoomById(roomId)
    }

    
    
  }
  selectCustomerById(customerId: number){
    this.message = undefined
    this.errors = undefined
    this.service.getCustomer(customerId).subscribe({
      next: data => {
        this.customer = data;
        if(this.room) this.getPricingPolicies(this.room.categoryId, this.customer.customerTypeId)
      },
    error: err =>{
      this.errors = err;
    }
    })
  }

  selectCustomer(customer: CustomerShowDto){
    this.message = undefined
    this.errors = undefined
    this.customer = customer;
    if(this.room) this.getPricingPolicies(this.room.categoryId, this.customer.customerTypeId)
  }

  

  selectRoomById(roomId: number){
    this.message = undefined
    this.errors = undefined
    this.service.getRoomById(roomId).subscribe({
      next: data =>{
        this.room = data;
        console.log(data)
        if(this.customer) this.getPricingPolicies(this.room.categoryId, this.customer.customerTypeId)
      },
    error: err =>{
      this.errors = err;
    }
    })
  }

  selectRoom(roomBookingDetails: RoomBookingDetails){
    this.errors = undefined
    this.message = undefined
    this.room = roomBookingDetails.room
    this.dateFrom = roomBookingDetails.dateFrom
    this.dateTo = roomBookingDetails.dateTo
    if(this.customer && this.room) this.getPricingPolicies(this.room.categoryId, this.customer.customerTypeId)
  }



getPricingPolicies(roomCategoryId?: number, customerTypeId?: number){
  console.log("loading pricing policies")
  this.service.getSpecifiedPricingPolicies(roomCategoryId, customerTypeId).subscribe({
    next: data =>{
      this.pricingPolicies = data;
      
      
    },
    error: err =>{
      this.errors = err;
    }
  })
}

submit(){
  if(!this.booking){
    this.addBooking()
  }else{
    this.updateBooking()
  }
}

addBooking(){
  let policyId = this.form.controls['pricingPolicy'].value
  let submitData: BookingInsertDto = {roomId: this.room?.id, customerId: this.customer?.id, dateFrom: this.dateFrom,
    dateTo: this.dateTo, pricingPolicyId: policyId
  }
  this.service.addBooking(submitData).subscribe({
    next: data =>{
      this.message = "Booking successfully made!"
      this.customer = undefined;
      this.room = undefined;
      this.dateFrom = undefined;
      this.dateTo = undefined;
      this.pricingPolicies = undefined
    },
    error: err =>{
      this.errors = err;
    }
  })
}

updateBooking(){
  let policyId = this.form.controls['pricingPolicy'].value
  let submitData: BookingUpdateDto = {
    id: this.booking?.id, roomId : this.room?.id, customerId : this.customer?.id, dateFrom: this.dateFrom,
    dateTo: this.dateTo, pricingPolicyId: policyId
  };
  this.service.updateBooking(submitData).subscribe({
    next: data =>{
      this.message = "Booking successfully updated";
    }, 
    error: err =>{
      this.errors = err;
    }
  })

}

resetRoom(){
  this.room = undefined;
  this.dateFrom = undefined;
  this.dateTo  = undefined;
}

resetCustomer(){
  this.customer = undefined;
}
}