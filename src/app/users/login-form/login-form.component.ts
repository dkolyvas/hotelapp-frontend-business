import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppServiceModule } from '../../app-service.module';
import { UserLoginDto } from '../../interfaces/user-login-dto';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
    constructor(private service :AppServiceModule = Inject(AppServiceModule),private router: Router,private jwtHelper: JwtHelperService = Inject(JwtHelperService)){}
    error?: any;

    form = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    })

    submit(){
      
      this.service.login(this.form.value as UserLoginDto).subscribe({
        next: data =>{
            let token = data.token;
            localStorage.setItem("accesstoken", token);
            console.log(token)
            let decodedToken = this.jwtHelper.decodeToken(token)
            console.log(decodedToken)
            this.service.isLoggedOn.next(true)
            this.service.username.next(decodedToken['sub'])
            this.service.userType.next(decodedToken['usertype'])
            this.router.navigate([""])
        },
        error: err =>{
          this.error = err;
        }
      })
    }
}
