import { Component, Inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppServiceModule } from './app-service.module';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, RouterLink, AppHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hotelapp';

  constructor(private service: AppServiceModule = Inject(AppServiceModule), private jwtHelper : JwtHelperService = Inject(JwtHelperService),
    private router: Router){}


  ngOnInit(){
    let token:string|null = localStorage.getItem("accesstoken")
    if(token){
      let decodedToken = this.jwtHelper.decodeToken(token);
      this.service.isLoggedOn.next(true)
      this.service.username.next(decodedToken['sub'])
      this.service.userType.next(decodedToken['usertype'])
      this.router.navigate([""])
    }
  }
}
