import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppServiceModule } from '../app-service.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {

  constructor(private service : AppServiceModule = Inject(AppServiceModule)){}

  isLoggedOn$ = this.service.isLoggedOn;
  username$ = this.service.username;
  userType$ = this.service.userType

  logout(){
    localStorage.removeItem("accesstoken");
    this.service.isLoggedOn.next(false);
    this.service.username.next("");
    this.service.userType.next("");
  }

}
