import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerShowDto } from '../../interfaces/customer-show-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-customer-search-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './customer-search-results.component.html',
  styleUrl: './customer-search-results.component.css'
})
export class CustomerSearchResultsComponent {
  @Input() customers?: CustomerShowDto[]; 
  @Input() embedded: boolean = false;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onBook = new EventEmitter<CustomerShowDto>();

  deleteCustomer(id?:number){
    if(id && confirm("Are you sure?")){
      this.onDelete.emit(id);
    }

  }

  bookCustomer(customer: CustomerShowDto){
    this.onBook.emit(customer);
  }

}
