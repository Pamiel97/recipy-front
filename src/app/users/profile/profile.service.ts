import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  saveProfile(data: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, data, { headers });
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl, { headers });
  }
}
