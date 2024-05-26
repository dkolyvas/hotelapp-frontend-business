import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSearchContainerComponent } from './room-search-container.component';

describe('RoomSearchContainerComponent', () => {
  let component: RoomSearchContainerComponent;
  let fixture: ComponentFixture<RoomSearchContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomSearchContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
