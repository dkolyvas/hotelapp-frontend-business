import { Component, Inject } from '@angular/core';
import { AppServiceModule } from '../../app-service.module';
import { UserShowDto } from '../../interfaces/user-show-dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterDto } from '../../interfaces/user-register-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  constructor(private service: AppServiceModule = Inject(AppServiceModule)){}

  users?: UserShowDto[];
  addMode: boolean = false;
  errors: any;
  editErrors: any;
  form = new FormGroup({
    username : new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl("")
  })


  ngOnInit(){
    this.loadUsers();
  }

  loadUsers(){
    this.service.getUsers().subscribe({
      next: data =>{
        this.users = data;
        this.errors = undefined;
      },
      error: err =>{
        this.errors = err;
      }
    })
  }

  showAdd(){
      this.form.reset();
      this.editErrors = undefined;
      this.addMode = true;
  }

  submitAdd(){
    let submitData: UserRegisterDto = this.form.value as UserRegisterDto
    this.service.registerUser(submitData).subscribe({
      next: data =>{
        this.loadUsers();
        this.editErrors = undefined;
        this.addMode = false;
      },
      error: err =>{
        this.editErrors = err;
      }
    })
  }

  cancelAdd(){
    this.editErrors = undefined;
    this.addMode = false;
  }
  
  delete(id: number){
    this.service.deleteUser(id).subscribe({
      next: data =>{
        this.loadUsers();
        this.errors = undefined;
      },
      error : err =>{
        this.errors = undefined;6
      }
    })
  }


}
