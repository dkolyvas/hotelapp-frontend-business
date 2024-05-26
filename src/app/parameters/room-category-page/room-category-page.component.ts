import { Component, Inject } from '@angular/core';
import { AppServiceModule } from '../../app-service.module';
import { RoomCategoryShowDto } from '../../interfaces/room-category-show-dto';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomCategoryEditDto } from '../../interfaces/room-category-edit-dto';

@Component({
  selector: 'app-room-category-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room-category-page.component.html',
  styleUrl: './room-category-page.component.css'
})
export class RoomCategoryPageComponent {
  constructor(private service: AppServiceModule = Inject(AppServiceModule)){}

  categories?: RoomCategoryShowDto[]
  selectedCategory? :RoomCategoryShowDto
  editMode: boolean = false
  errors: any
  editErrors: any

  form = new FormGroup({
    personsNumber : new FormControl<number|undefined>(undefined),
    description : new FormControl("")
  })

  ngOnInit(){
    this.loadCategories();
  }
  loadCategories(){
    this.service.getRoomCategories().subscribe({
      next: data =>{
        this.categories = data
        this.errors = undefined
      },
      error: err =>{
        this.errors = err
      }
    })
  }

  showEdit(id: number){
    this.selectedCategory = this.categories?.find(a => a.id == id);
    if(this.selectedCategory)    {
      this.form.patchValue(this.selectedCategory)
      this.editMode = true;
    }else this.errors = {error: "Unable to load data"}
    
  }

  showAdd(){
    this.selectedCategory = undefined;
    this.form.reset();
    this.editMode = true;
  }

  cancelEdit(){
    this.selectedCategory = undefined;
    this.editMode = false;
    this.editErrors = undefined
  }

  submitAddEdit(){
    let submitData: RoomCategoryEditDto = this.form.value as RoomCategoryEditDto;
    if(this.selectedCategory){
      submitData.id = this.selectedCategory.id
      this.service.updateRoomCategory(submitData).subscribe({
        next: data =>{
          this.selectedCategory = undefined
          this.editMode = false
          this.loadCategories()
          this.editErrors = undefined
        },
        error: err =>{
          this.editErrors = err
        }
      })
    }else{
      this.service.addRoomCategory(submitData).subscribe({
        next: data =>{
          this.selectedCategory = undefined
          this.editMode = false
          this.loadCategories()
          this.editErrors = undefined
        },
        error: err =>{
          this.editErrors = err
        }

      })

    }
  }

  delete(id: number){
    if(confirm("Are you sure you want to delete this category?")){
      this.service.deleteRoomCategory(id).subscribe({
        next: data =>{
          this.loadCategories();
        },
        error: err =>{
          this.errors = err
        }
      })
    }
  }

}
