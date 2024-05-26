import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPolicyEditComponent } from './pricing-policy-edit.component';

describe('PricingPolicyEditComponent', () => {
  let component: PricingPolicyEditComponent;
  let fixture: ComponentFixture<PricingPolicyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingPolicyEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingPolicyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
