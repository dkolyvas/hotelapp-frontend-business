import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTypePageComponent } from './customer-type-page.component';

describe('CustomerTypePageComponent', () => {
  let component: CustomerTypePageComponent;
  let fixture: ComponentFixture<CustomerTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTypePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
