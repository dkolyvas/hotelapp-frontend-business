import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { PricingPolicyShowDto } from '../../interfaces/pricing-policy-show-dto';
import { PricingPolicyEditDto } from '../../interfaces/pricing-policy-edit-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomertypeShowDto } from '../../interfaces/customertype-show-dto';
import { RoomCategoryShowDto } from '../../interfaces/room-category-show-dto';

@Component({
  selector: 'app-pricing-policy-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pricing-policy-edit.component.html',
  styleUrl: './pricing-policy-edit.component.css'
})
export class PricingPolicyEditComponent {
  @Input() editPolicy?: PricingPolicyShowDto;
  @Input() customerTypes? : CustomertypeShowDto[];
  @Input() roomCategories? : RoomCategoryShowDto[];
  @Output() onSubmit = new EventEmitter<PricingPolicyEditDto>();
  @Output() onCancel = new EventEmitter()
  @Input() errors : any

  form = new FormGroup({
    roomCategoryId: new FormControl<number|undefined>(undefined),
    customerTypeId: new FormControl<number|undefined>(undefined),
    specification: new FormControl<string>(""),
    price: new FormControl<number|undefined>(undefined)
  })

  ngOnChanges(changes: SimpleChanges){
    if(changes['editPolicy'].currentValue){
      this.form.patchValue(changes['editPolicy'].currentValue)
    }
  }

  submit(){
    let submitData: PricingPolicyEditDto = this.form.value as PricingPolicyEditDto;
    if(submitData.customerTypeId == -1) submitData.customerTypeId = undefined;
    if(this.editPolicy) submitData.id = this.editPolicy.id;
    this.onSubmit.emit(submitData);
  }

  cancel(){
    this.onCancel.emit();
  }
  

}
