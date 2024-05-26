import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCategoryPageComponent } from './room-category-page.component';

describe('RoomCategoryPageComponent', () => {
  let component: RoomCategoryPageComponent;
  let fixture: ComponentFixture<RoomCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCategoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
