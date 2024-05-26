import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPolicyHomeComponent } from './pricing-policy-home.component';

describe('PricingPolicyHomeComponent', () => {
  let component: PricingPolicyHomeComponent;
  let fixture: ComponentFixture<PricingPolicyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingPolicyHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingPolicyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
