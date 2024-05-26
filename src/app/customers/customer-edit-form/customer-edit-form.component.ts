import { Component, Inject } from '@angular/core';
import { AppServiceModule } from '../../app-service.module';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerEditDto } from '../../interfaces/customer-edit-dto';
import { CustomerShowDto } from '../../interfaces/customer-show-dto';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomertypeShowDto } from '../../interfaces/customertype-show-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-edit-form',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './customer-edit-form.component.html',
  styleUrl: './customer-edit-form.component.css'
})
export class CustomerEditFormComponent {
  constructor(private service: AppServiceModule = Inject(AppServiceModule), private route:ActivatedRoute , private router: Router){}
  customer?: CustomerEditDto;
  errors?: any
  customerTypes?: CustomertypeShowDto[];
  updateMode: boolean = false;
  dateFrom?: string
  dateTo?: string
  form = new FormGroup({
    id: new FormControl<number|null>(null),
    givenName: new FormControl(''),
    surname: new FormControl(''),
    address: new FormControl(''),
    country: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    passportNo: new FormControl(''),
    customerTypeId: new FormControl<number|null>(null),
    
  }
   )

  ngOnInit(){
    let id = Number( this.route.snapshot.queryParams['id']);
    this.dateFrom = this.route.snapshot.queryParams["dateFrom"]
    this.dateTo = this.route.snapshot.queryParams["dateTo"]
    
    let customerData: CustomerShowDto|undefined;
    console.log(id)

    this.service.getCustomerTypes().subscribe({
      next: (data)=> this.customerTypes= data, 
      error: (err)=> this.errors = err
    })

    if(id){
      this.service.getCustomer(id).subscribe({
        next: data =>{ customerData = data;
          console.log(customerData)
          this.customer = {id: customerData.id, givenName:customerData.givenName, surname: customerData.surname,
            address: customerData.address, country:customerData.country, phone:customerData.phone, email: customerData.email, 
            passportNo: customerData.passportNo, userId: undefined, customerTypeId: customerData.customerTypeId} 
            console.log(this.customer)
            this.form.patchValue(this.customer)
            this.updateMode = true;
            
        },
        error: err => this.errors = err
        
      });
      // if(customerData){
        
      //   this.customer = {id: customerData.id, givenName:customerData.givenName, surname: customerData.surname,
      //   address: customerData.address, country:customerData.country, phone:customerData.phone, email: customerData.email, 
      //   passportNo: customerData.passportNo, userId: undefined, customerTypeId: customerData.customerTypeId} 
      //   console.log(this.customer)
      //   this.form.patchValue(this.customer)
      //   this.updateMode = true;

      // }
    }
 
  }

  submit(){
    if(!this.updateMode){
      this.service.insertCustomer(this.form.value as CustomerEditDto).subscribe({
        
        next: data => {
          this.router.navigate(["/CustomerHome"])
         
        },
        error: err => this.errors = err
      });
    }else{
      this.service.updateCustomer(this.form.value as CustomerEditDto).subscribe({
        next: data =>{
          if(this.dateFrom && this.dateTo){
            console.log(`DateFrom: ${this.dateFrom}, DateTo: ${this.dateTo}`)
            this.router.navigate(["/CustomerStatistics"],{queryParams: {dateFrom: this.dateFrom, dateTo: this.dateTo}})
          }else{
            console.log(`DateFrom: ${this.dateFrom}, DateTo: ${this.dateTo}`)
            this.router.navigate(["/CustomerHome"])
          }
        } ,
        error: err => this.errors = err
      })
    }
  }


}
