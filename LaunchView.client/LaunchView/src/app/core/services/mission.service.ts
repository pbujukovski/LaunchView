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

  getLatestMission(path: string): void {
    this.apiService.get<Mission>(path).pipe(
      tap((mission) => 
      {
        console.log("HEREEE IN MISSSION PIPE");
        console.log(mission);
        this._mission$.next(mission)
      }
        )
    )
    .subscribe(); 
  }


  // getUpcomingMissions(): Observable<Mission[]> {
  //   return this.http.get<Mission[]>(`${this.apiUrl}/upcoming-missions`);
  // }

  // getPastMissions(): Observable<Mission[]> {
  //   return this.http.get<Mission[]>(`${this.apiUrl}/past-missions`);
  // }

  // getMissionById(id: string): Observable<Mission> {
  //   return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  // }
}
