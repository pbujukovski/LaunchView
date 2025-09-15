import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Mission } from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  
  private _mission$: BehaviorSubject<Mission> = new BehaviorSubject<Mission>(new Mission());
  public mission$ = this._mission$.asObservable();

  private _missions$: BehaviorSubject<Mission[]> = new BehaviorSubject<Mission[]>([]);
  public missions$ = this._missions$.asObservable();


 constructor(private apiService: ApiService) { }


  getMission<T>(path: string): void {
    this.apiService.get<T>(path).pipe(
      tap((data: T) => {
        if (Array.isArray(data)) {
          console.log("Updating missions array:", data);
          this._missions$.next(data as Mission[]);
        } else {
          console.log("Updating single mission object:", data);
          this._mission$.next(data as Mission);
        }
      })
    ).subscribe();
  }

  // getMissionById(id: string): Observable<Mission> {
  //   return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  // }
}
