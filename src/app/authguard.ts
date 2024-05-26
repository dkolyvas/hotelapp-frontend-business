import { Inject, Injectable } from "@angular/core";
import { AppServiceModule } from "./app-service.module";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
@Injectable({providedIn: "root"})
export class Authguard {
    constructor(private service: AppServiceModule = Inject(AppServiceModule),
        private jwtHelper: JwtHelperService = Inject(JwtHelperService),
        private router: Router ,
        // @Inject(DOCUMENT) private document: Document
    ){   }
    
   canActivate(){
     
    if(this.service.isLoggedOn && !this.jwtHelper.isTokenExpired(localStorage.getItem('accesstoken')) ){
        return true;
    }else{
        this.router.navigate(['/Login']);
        return false;
    }
   }
}
