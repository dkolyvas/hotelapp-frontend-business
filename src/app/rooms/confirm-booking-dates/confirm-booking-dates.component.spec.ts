import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBookingDatesComponent } from './confirm-booking-dates.component';

describe('ConfirmBookingDatesComponent', () => {
  let component: ConfirmBookingDatesComponent;
  let fixture: ComponentFixture<ConfirmBookingDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmBookingDatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmBookingDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
