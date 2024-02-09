import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseURL}/${url}`);
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseURL}/${url}`, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseURL}/${url}`);
  }

}
