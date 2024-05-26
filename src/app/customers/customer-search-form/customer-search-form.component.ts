import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomertypeShowDto } from '../../interfaces/customertype-show-dto';
import { CustomerSearchDto } from '../../interfaces/customer-search-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-search-form.component.html',
  styleUrl: './customer-search-form.component.css'
})
export class CustomerSearchFormComponent {
  @Input() customerTypes? : CustomertypeShowDto[];
  @Output() onSubmit = new EventEmitter<CustomerSearchDto>();

  form = new FormGroup({
    givenName: new FormControl(""),
    surname: new FormControl(""),    
    country: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    passportNo: new FormControl(""),    
    customerType: new FormControl(null)
  })

  submitForm(){
    console.log("button clicked");
    this.onSubmit.emit(this.form.value as CustomerSearchDto)
  }

}
