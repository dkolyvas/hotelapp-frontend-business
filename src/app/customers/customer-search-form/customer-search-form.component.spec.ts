import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchFormComponent } from './customer-search-form.component';

describe('CustomerSearchFormComponent', () => {
  let component: CustomerSearchFormComponent;
  let fixture: ComponentFixture<CustomerSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
