import { Component, Inject } from '@angular/core';
import { AppServiceModule } from '../../app-service.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangePasswordDto } from '../../interfaces/change-password-dto';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  constructor(private service: AppServiceModule = Inject(AppServiceModule)){}
  message?: string
  errors: any
  username$: BehaviorSubject<string> = this.service.username

  form = new FormGroup({
    oldPassword: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl("")
  })

submit(){
  let submitData: ChangePasswordDto = this.form.value as ChangePasswordDto;
  submitData.username = this.service.username.value
  this.service.changeUserPassword(submitData).subscribe({
    next: data =>{
      this.message = "Password changed successfully"
      this.errors = undefined
    },
    error: err =>{
      this.errors = err;
    }
  })
}


}
