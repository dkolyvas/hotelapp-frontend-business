import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchResultsComponent } from './customer-search-results.component';
import { CommonModule } from '@angular/common';

describe('CustomerSearchResultsComponent', () => {
  let component: CustomerSearchResultsComponent;
  let fixture: ComponentFixture<CustomerSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSearchResultsComponent, CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
