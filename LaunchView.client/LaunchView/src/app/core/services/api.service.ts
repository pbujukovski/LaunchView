import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

//Export class for URL from backend/database
export class ApiService {
  public baseUrl: string;

  public constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.api + '/api';
  }

  //Get method for baseURL
  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, { withCredentials: true });
  }

  //Post method for baseURL
  public post<T>(url: string, body: any): Observable<any> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, { withCredentials: true });
  }

  //Delete method for baseURL
  public delete(url: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${url}`, { withCredentials: true });
  }

  //Put method for baseURl
  public put(url: string, body: any): any {
    return this.http.put(`${this.baseUrl}/${url}`, body, { withCredentials: true });
  }
}
