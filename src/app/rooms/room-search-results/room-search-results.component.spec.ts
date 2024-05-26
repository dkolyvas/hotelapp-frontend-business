import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSearchResultsComponent } from './room-search-results.component';

describe('RoomSearchResultsComponent', () => {
  let component: RoomSearchResultsComponent;
  let fixture: ComponentFixture<RoomSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomSearchResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
