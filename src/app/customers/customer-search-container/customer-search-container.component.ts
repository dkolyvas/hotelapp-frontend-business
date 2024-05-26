import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CustomerSearchFormComponent } from '../customer-search-form/customer-search-form.component';
import { CustomerSearchResultsComponent } from '../customer-search-results/customer-search-results.component';
import { AppServiceModule } from '../../app-service.module';
import { CustomerShowDto } from '../../interfaces/customer-show-dto';
import { CustomertypeShowDto } from '../../interfaces/customertype-show-dto';
import { CustomerSearchDto } from '../../interfaces/customer-search-dto';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-search-container',
  standalone: true,
  imports: [CustomerSearchResultsComponent, CustomerSearchFormComponent, CommonModule],
  templateUrl: './customer-search-container.component.html',
  styleUrl: './customer-search-container.component.css'
})
export class CustomerSearchContainerComponent {
  constructor(private service:AppServiceModule = Inject(AppServiceModule), private router : Router){}

  customers?: CustomerShowDto[];
  customerTypes?: CustomertypeShowDto[];
  
  errors?: any
  @Input() embedded: boolean = false
  @Output() onBook= new EventEmitter<CustomerShowDto>()

  ngOnInit(){
    this.service.getCustomerTypes().subscribe({
      next: (types)=> {this.customerTypes=types

      },
      error: (err)=>{ this.errors = err}
    })
    console.log("initializing component")

  }

  searchCustomers(criteria: CustomerSearchDto){
    console.log(criteria)
    this.service.getCustomers(criteria).subscribe({
      next: (data)=>{
        this.customers = data;
        this.customers.sort((a, b) =>{
          let surnComp = a.surname.localeCompare(b.surname);
          let fnComp = a.givenName.localeCompare(b.givenName);
          if(surnComp != 0) return surnComp;
          else return fnComp;
        })
        this.errors = undefined
        console.log(this.customers)
      },
      error: (err)=>{
        this.errors = err;
      }

    })
  }

  book(customer: CustomerShowDto){
      if(this.embedded){
        this.onBook.emit(customer)
      }else{
        this.router.navigate(['/BookingEdit'], {queryParams: {customerId: customer.id}})
      }
  }

  deleteCustomer(customerId: number){
    let index = this.customers?.findIndex(c => c.id == customerId);
    if(!index) index = -1;

    this.service.deleteCustomer(customerId).subscribe({
      next: data =>{
        this.errors = undefined;
        this.customers?.splice(index, 1);
      },
      error: err =>{
        this.errors = err;
      }
    })
  }
}