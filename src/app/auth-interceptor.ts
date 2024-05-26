import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const access_token = localStorage.getItem("accesstoken");
        if(access_token){
            let clonedReq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + access_token)
            })
            return next.handle(clonedReq)
        }else{
            return next.handle(req)
        }
    }
}
