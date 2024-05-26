import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSearchFormComponent } from './room-search-form.component';

describe('RoomSearchFormComponent', () => {
  let component: RoomSearchFormComponent;
  let fixture: ComponentFixture<RoomSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomSearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
