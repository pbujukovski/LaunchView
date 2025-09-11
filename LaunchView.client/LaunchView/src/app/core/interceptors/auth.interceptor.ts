import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private apiService: ApiService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes(this.apiService.baseUrl)) {
            if (this.authService.getToken()){
                return next.handle(req.clone({
                    withCredentials: true,
                    headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken())
                })).pipe(
                    catchError((err: HttpErrorResponse) => {
                      if (err.status === 401) {
                        this.authService.onLogout();
                        this.router.navigate(['/login'], { queryParams: { reason: 'unauthorized' } });
                      }
                      return throwError(() => err);
                    })
                  );
            } 
        } 

        return next.handle(req);
    }
}
  