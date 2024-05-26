import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RoomSearchDto } from '../../interfaces/room-search-dto';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-room-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room-search-form.component.html',
  styleUrl: './room-search-form.component.css'
})
export class RoomSearchFormComponent {
  @Output() onSubmitSearch = new EventEmitter<RoomSearchDto>();
  @Output() onSubmitGet = new EventEmitter<string>()
  searchForm = new FormGroup({
    dateFrom: new FormControl(""),
    dateTo: new FormControl(""),
    personsNo: new FormControl<number|undefined>(undefined)
  })
  getForm = new FormGroup({
    code: new FormControl<string|undefined>("")
  })

  submitSearch(){
    this.onSubmitSearch.emit(this.searchForm.value as RoomSearchDto)
  }

  submitGet(){
    let code = this.getForm.controls["code"].value;
    if(code)
    {
        this.onSubmitGet.emit(code);
    }
  }

}
