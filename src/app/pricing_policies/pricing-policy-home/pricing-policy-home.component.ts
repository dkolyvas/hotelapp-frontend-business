import { Component, Inject } from '@angular/core';
import { AppServiceModule } from '../../app-service.module';
import { CustomertypeShowDto } from '../../interfaces/customertype-show-dto';
import { RoomCategoryShowDto } from '../../interfaces/room-category-show-dto';
import { PricingPolicyShowDto } from '../../interfaces/pricing-policy-show-dto';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PricingPolicyEditDto } from '../../interfaces/pricing-policy-edit-dto';
import { PricingPolicyEditComponent } from '../pricing-policy-edit/pricing-policy-edit.component';

@Component({
  selector: 'app-pricing-policy-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PricingPolicyEditComponent],
  templateUrl: './pricing-policy-home.component.html',
  styleUrl: './pricing-policy-home.component.css'
})
export class PricingPolicyHomeComponent {
  constructor(private service: AppServiceModule = Inject(AppServiceModule)){}

   customerTypes?: CustomertypeShowDto[];
   roomCategories?: RoomCategoryShowDto[];
   pricingPolicies?: PricingPolicyShowDto[];
   errors: any;
   editErrors: any
   editMode: boolean = false;
   editId?: number;
   editPolicy?: PricingPolicyShowDto


   form = new FormGroup({
    roomCategory : new FormControl<number|undefined>(undefined),
    customerType: new FormControl<number|undefined>(undefined)
  })


  ngOnInit(){
    this.service.getCustomerTypes().subscribe({
      next: data =>{
        this.customerTypes = data;
        let defaultCustomer: CustomertypeShowDto = {id : -1, name: "Default policy"};
        this.customerTypes.push(defaultCustomer);
      },
      error: err =>{
        this.errors = err;
      }
    })
    this.service.getRoomCategories().subscribe({
      next: data =>{
        this.roomCategories = data;
        
      },
      error: err =>{
        this.errors = err;
      }
    })
  }

  selectRoomCategory(){
    let roomCateogryId = this.form.controls['roomCategory'].value;
    console.log(`Selected room category ${roomCateogryId}`)
    if(roomCateogryId){
      this.form.controls['customerType'].patchValue(undefined);
      this.service.getPoliciesForRoomCateogory(roomCateogryId).subscribe({
        next: data =>{
          this.pricingPolicies = data;
          this.orderPolicies();
        },
        error: err =>{
          this.errors = err;
        }
      })
    }
  }

  selectCustomerType(){
    let customerTypeId = this.form.controls['customerType'].value;
    console.log(`Selected customer type ${customerTypeId}`)
    if(customerTypeId){
      this.form.controls["roomCategory"].patchValue(undefined);
      this.service.getPoliciesForCustomerType(customerTypeId).subscribe({
        next: data =>{
          this.pricingPolicies = data;
          this.orderPolicies();
        },
        error: err =>{
          this.errors = err;
        }
      })
    }
  }


  orderPolicies(){
    this.pricingPolicies?.sort((a,b)=>{
      if(a.customerTypeId != b.customerTypeId  ){
        if(!a.customerTypeId) return 1;
        else if(!b.customerTypeId) return -1
        else return a.customerTypeId - b.customerTypeId;
      }else if (a.roomCategoryId != b.roomCategoryId){
        return a.roomCategoryId - b.roomCategoryId
      }else{
        return a.id - b.id
      }
    })
  }

  selectUpdate(id: number){
    this.editPolicy = this.pricingPolicies?.find(a => a.id == id)
    if(this.editPolicy) this.editMode = true;
  }

  selectAdd(){
    this.editPolicy = undefined
    this.editMode = true;
  }

  reloadData(){
    if(this.form.controls['roomCategory'].value) this.selectRoomCategory();
      else if( this.form.controls['customerType'].value) this.selectCustomerType();
      else return;

  }

  submitEdit(editDto: PricingPolicyEditDto){
    if(this.editPolicy) {
      this.service.updatePolicy(editDto).subscribe({
        next: data =>{
          this.reloadData()
          this.editMode = false
        }, 
        error: err =>{
          this.editErrors = err
        }
      })
    }else{
      this.service.addPolicy(editDto).subscribe({
        next: data =>{
          this.reloadData()
          this.editMode = false
        }, 
        error: err =>{
          this.editErrors = err
        }
      })
    }
  }

  cancelEdit(){
    this.editPolicy = undefined;
    this.editMode = false
  }

  deletePolicy(id: number){
    if(confirm("Are you sure you want to delete this pricing policy?")){
      this.service.deletePolicy(id).subscribe({
        next: data =>{
          this.reloadData()
          this.editMode = false
        }, 
        error: err =>{
          this.errors = err
        }
      })
    }
  }





}
