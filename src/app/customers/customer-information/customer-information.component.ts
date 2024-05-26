import { Component, Inject } from '@angular/core';
import { AppServiceModule } from '../../app-service.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerInformationDto } from '../../interfaces/customer-information-dto';

@Component({
  selector: 'app-customer-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './customer-information.component.html',
  styleUrl: './customer-information.component.css'
})
export class CustomerInformationComponent {
  constructor(private service: AppServiceModule = Inject(AppServiceModule), private route: ActivatedRoute){}
  dateFrom: string|null =""
  dateTo : string|null = ""

form= new FormGroup({
  dateFrom: new FormControl(""),
  dateTo: new FormControl("")
})

customerStatistics?: CustomerInformationDto[]
errors: any

ngOnInit(){
  this.dateFrom= this.route.snapshot.queryParams["dateFrom"]
  this.dateTo = this.route.snapshot.queryParams["dateTo"]
  if(this.dateFrom && this.dateTo){
    this.form.patchValue({dateFrom: this.dateFrom, dateTo: this.dateTo})
  }
  this.search()
}

submitSearch(){
  this.dateFrom = this.form.controls["dateFrom"].value
  this.dateTo = this.form.controls["dateTo"].value
  this.search()
 
}
search(){
  if(this.dateFrom && this.dateTo){
    this.service.getCustomerStatistics(this.dateFrom, this.dateTo).subscribe({
      next: data =>{
        this.customerStatistics = data
        this.customerStatistics.sort((a,b)=>{
          let surnComp = a.surname.localeCompare(b.surname);
            let fnComp = a.givenName.localeCompare(b.givenName);
            if(surnComp != 0) return surnComp;
            else return fnComp;
        })
      },
      error: err=>{
        this.errors = err
      }
    })
   }
}

}
