import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { ApiService } from './api.service';
import { Login } from '../models/login.model';
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.model';
import { CookieService } from './cookie.service';
import { CookieStatics } from '../../utils/cookie/cookie.statics';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken: string | null = null;
  private _isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated$.asObservable();

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.restoreAuth(); // or move to APP_INITIALIZER (below)
  }

  
  handleAuth(path: string, body: any): Observable<AuthResponse> {
    return this.apiService.post(path, body)
    .pipe(tap(r => this.setToken(r.token)));
  }

  restoreAuth(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const token =
      this.cookieService.getCookie(CookieStatics.ACCESS_TOKEN) ||
      localStorage.getItem('access_token');

    if (token && !this.isExpired(token)) {
      this.setToken(token);
    } else {
      this.clearToken();
    }
  } 

  onLogout(): void {
    this.clearToken();
    this.router.navigate(['/']);
  }

  getToken(): string | null { 
    return this.accessToken; 
  }

  get isLoggedIn(): boolean {
    return this._isAuthenticated$.value;
  }

  private setToken(token: string) { 
    this.accessToken = token;
    this._isAuthenticated$.next(true); 
    this.cookieService.setCookie(CookieStatics.ACCESS_TOKEN, token, this.getExpirationTimestamp(token));
  }

  private clearToken() 
  { 
    this.accessToken = null; 
    this._isAuthenticated$.next(false); 
    this.cookieService.deleteCookie(CookieStatics.ACCESS_TOKEN);
  }

  private isExpired(jwt: string): boolean {
    try {
      const payload = JSON.parse(atob(jwt.split('.')[1]));
      return typeof payload.exp === 'number' && Date.now() >= payload.exp * 1000;
    } catch {
      return false; 
    }
  }


  private getExpirationTimestamp(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ?? null;
    } catch {
      return null;
    }
  }
}
