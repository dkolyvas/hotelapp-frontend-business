import { Component, Inject } from '@angular/core';
import { AppServiceModule } from '../../app-service.module';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomEditDto } from '../../interfaces/room-edit-dto';
import { RoomCategoryShowDto } from '../../interfaces/room-category-show-dto';
import { RoomShowDto } from '../../interfaces/room-show-dto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import path from 'path';

@Component({
  selector: 'app-room-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room-edit.component.html',
  styleUrl: './room-edit.component.css'
})
export class RoomEditComponent {
  constructor(private service: AppServiceModule = Inject(AppServiceModule), private route:ActivatedRoute , private router: Router){}

  room?:RoomEditDto;
  roomCategories?: RoomCategoryShowDto[];
  errors: any;
  updateMode: boolean = false;

  form = new FormGroup({
    id: new FormControl<number|undefined>(this.room?.id),
    code: new FormControl(this.room?.code),
    floor: new FormControl(this.room?.floor),
    categoryId: new FormControl<number|undefined>(this.room?.categoryId)
  })



  ngOnInit(){
    let id = Number(this.route.snapshot.queryParams['id']);
    let roomData: RoomShowDto|undefined;

    this.service.getRoomCategories().subscribe({
      next: data =>{
        this.roomCategories = data;
      },
      error: err =>{
        this.errors = err;
      }
    })

    if(id){
      this.service.getRoomById(id).subscribe({
        next: data =>{
          roomData = data;
          this.room = { id : roomData.id, floor : roomData.floor, categoryId : roomData.categoryId, code: roomData.code};
          this.updateMode = true
          this.form.patchValue(this.room)
        },
        error: err => {
          this.errors = err;
        }
      })
    }

  }

  submit(){
    if(this.updateMode){
      this.service.updateRoom(this.form.value as RoomEditDto).subscribe({
        next: data =>{
          this.router.navigate(["/RoomHome"])
        },
        error: err =>{
          this.errors = err;
        }
      })
    }else{
      this.service.addRoom(this.form.value as RoomEditDto).subscribe({
        next: data =>{
          this.router.navigate(["/RoomHome"])
        },
        error: err =>{
          this.errors = err;
        }

      })
    }
  }


}


