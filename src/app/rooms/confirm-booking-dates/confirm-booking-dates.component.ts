import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateSpanDTO } from '../../interfaces/date-span-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomShowDto } from '../../interfaces/room-show-dto';

@Component({
  selector: 'app-confirm-booking-dates',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './confirm-booking-dates.component.html',
  styleUrl: './confirm-booking-dates.component.css'
})
export class ConfirmBookingDatesComponent {
  @Input() period?: DateSpanDTO
  @Input() selectedRoom?: RoomShowDto
  @Input() roomUnavailable?: boolean
  
  @Output() onSelectDates = new EventEmitter<DateSpanDTO>()
  @Output() onCancelSelect = new EventEmitter()

  form = new FormGroup({
    dateFrom: new FormControl(),
    dateTo : new FormControl()
  })

  submit(){
    this.onSelectDates.emit(this.form.value as DateSpanDTO)
  }

  cancel(){
    this.onCancelSelect.emit()
  }

  ngOnInit(){
    if(this.period){
      this.form.patchValue(this.period)
    }
  }


}
