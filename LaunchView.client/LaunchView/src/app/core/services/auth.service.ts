import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Login } from '../models/login.model';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { CookieService } from './cookie.service';
import { CookieStatics } from '../../utils/cookie/cookie.statics';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | null = null;
  private _isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated$.asObservable();

  constructor(private apiService: ApiService, private cookieService: CookieService) {} 
  
  handleAuth(path: string, body: any): Observable<AuthResponse> {
    return this.apiService.post(path, body)
    .pipe(tap(r => this.setToken(r.token)));
  }

  onLogout(): void {
    this.clearToken();
  }

  getToken(): string | null { 
    return this.accessToken; 
  }

  private setToken(token: string) { 
    this.accessToken = token;
    this._isAuthenticated$.next(true); 
    this.cookieService.setCookie(CookieStatics.ACCESS_TOKEN, token, 60);
  }

  private clearToken() 
  { 
    this.accessToken = null; 
    this._isAuthenticated$.next(false); 
    this.cookieService.deleteCookie(CookieStatics.ACCESS_TOKEN);
  }
}
