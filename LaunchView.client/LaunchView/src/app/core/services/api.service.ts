import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageParams } from '../../utils/models/page-params.model';

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
  public get<T>(url: string, headers?: HttpHeaders): Observable<T> {
      if (headers) {
        return this.http.get<T>(`${this.baseUrl}/${url}`, { headers, withCredentials: true });
      }
      return this.http.get<T>(`${this.baseUrl}/${url}`, { withCredentials: true });
  }

  public getWithQueryParams<T>(url: string, queryParams: PageParams, headers?: HttpHeaders): Observable<T> {

    //Create an empty object
    const params: { [key: string]: string } = {}
    //Conditionally add key-value pairs
    if (queryParams.pageIndex) {
      params['pageIndex'] = queryParams.pageIndex.toString();
    }
    if (queryParams.pageSize) {
      params['pageSize'] = queryParams.pageSize.toString();
    }
    if (queryParams.sort) {
      params['sort'] = queryParams.sort;
    }
    if (queryParams.order) {
      params['order'] = queryParams.order;
    }
    if (queryParams.filter) {
      params['filter'] = queryParams.filter;
    }
    
    if (headers) {
      return this.http.get<T>(`${this.baseUrl}/${url}`, { params, headers, withCredentials: true });
    }
    return this.http.get<T>(`${this.baseUrl}/${url}`, { params, headers, withCredentials: true });
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
