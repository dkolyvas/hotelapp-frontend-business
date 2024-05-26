import { Component, Inject } from '@angular/core';
import { CustomertypeShowDto } from '../../interfaces/customertype-show-dto';
import { AppServiceModule } from '../../app-service.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomertypeEditDto } from '../../interfaces/customertype-edit-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-type-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-type-page.component.html',
  styleUrl: './customer-type-page.component.css'
})
export class CustomerTypePageComponent {
  constructor(private service: AppServiceModule = Inject(AppServiceModule)){}

  types?: CustomertypeShowDto[]
  selectedType?: CustomertypeShowDto
  editMode: boolean = false
  errors: any
  editErrors: any

  form = new FormGroup({
    name: new FormControl("")
  })

  loadTypes(){
    this.service.getCustomerTypes().subscribe({
      next: data =>{
        this.types = data
        this.errors = undefined
      },
      error: err =>{
        this.errors = err
      }
    })
  }

  ngOnInit(){
    this.loadTypes();
  }

  showEdit(id: number){
    this.selectedType = this.types?.find(a => a.id == id);
    if(this.selectedType){
      this.form.patchValue(this.selectedType)
      this.editMode = true
    }else this.errors = {error: "Unable to load data"}
  }

  showAdd(){
    this.selectedType = undefined
    this.form.reset();
    this.editMode = true;
  }

  cancelEdit(){
    this.selectedType = undefined
    this.editMode = false
    this.editErrors = undefined
  }

  submitAddEdit(){
    let submitData: CustomertypeEditDto = this.form.value as CustomertypeEditDto;
    if(this.selectedType){
      submitData.id = this.selectedType.id
      this.service.updateCustomerType(submitData).subscribe({
        next: data =>{
          this.selectedType = undefined
          this.editMode = false
          this.loadTypes()
          this.editErrors = undefined
        },
        error: err =>{
          this.editErrors = err
        }
      })
    }else{
      this.service.addCustomerType(submitData).subscribe({
        next: data =>{
          this.selectedType = undefined
          this.editMode = false
          this.loadTypes()
          this.editErrors = undefined
        },
        error: err =>{
          this.editErrors = err
        }
      })
    }
  }

  delete(id: number){
    if(confirm("Are you sure you want to delete thsi customer type?")){
      this.service.deleteCustomerType(id).subscribe({
        next: data =>{
          this.loadTypes()
        }, 
        error: err =>{
          this.errors = err;
        }
      })
    }
  }

}
