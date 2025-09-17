import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Mission } from '../models/mission.model';
import { PageParams } from '../../utils/models/page-params.model';
import { MissionResponse } from '../models/mission-response.model';
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private _mission$: BehaviorSubject<Mission> = new BehaviorSubject<Mission>(new Mission());
  public mission$ = this._mission$.asObservable();

  private _missions$: BehaviorSubject<Mission[]> = new BehaviorSubject< Mission[]>([]);
  public missions$ = this._missions$.asObservable();

  private _missionsWithQuery$: BehaviorSubject<MissionResponse> = new BehaviorSubject<MissionResponse>({ docs: [], totalDocs: 0 });
  public missionsWithQuery$ = this._missionsWithQuery$.asObservable();

  constructor(private apiService: ApiService, private authService: AuthService) {}

  getMission<T>(path: string): void {
    this.apiService
      .get<T>(path, this.getHeaderOptions())
      .pipe(
        tap((data: T) => {
          if (Array.isArray(data)) {
            console.log('Updating missions array:', data);
            this._missions$.next(data as Mission[]);
          } else {
            console.log('Updating single mission object:', data);
            this._mission$.next(data as Mission);
          }
        })
      )
      .subscribe();
  }

  getMissions(path: string, queryParams: PageParams): void {
    this.apiService
      .getWithQueryParams<MissionResponse>(path, queryParams, this.getHeaderOptions())
      .pipe(
        tap((data: MissionResponse) => {
          console.log('Updating single mission object:', data);
          this._missionsWithQuery$.next(data as MissionResponse);
        })
      )
      .subscribe();
  }

  getHeaderOptions(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });

    return headers;
  }
}
