import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchContainerComponent } from './customer-search-container.component';

describe('CustomerSearchContainerComponent', () => {
  let component: CustomerSearchContainerComponent;
  let fixture: ComponentFixture<CustomerSearchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSearchContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
