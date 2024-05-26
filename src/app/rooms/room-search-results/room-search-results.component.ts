import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomShowDto } from '../../interfaces/room-show-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-room-search-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './room-search-results.component.html',
  styleUrl: './room-search-results.component.css'
})
export class RoomSearchResultsComponent {
  @Input() rooms?: RoomShowDto[]
  @Input() embedded: boolean = false;
  @Output() onRoomSelectForBooking = new EventEmitter<RoomShowDto>()
  @Output() onRoomDelete = new EventEmitter<number>();
  @Input() userType$?: BehaviorSubject<string>

  selectRoomForBooking(room: RoomShowDto){
    this.onRoomSelectForBooking.emit(room)
  }

  deleteRoom(id?: number){
    if(id && confirm("Are you sure you want to delete this room?")){
      this.onRoomDelete.emit(id);
    }
  }
}
