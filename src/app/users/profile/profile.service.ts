import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  savePassword(value: any) {
    throw new Error('Method not implemented.');
  }
  private baseApiUrl = 'http://localhost:8080/api';
  private userApiPath = '/users'
  private intolerancePath = '/intolerance'
  private allergyPath = '/allergies'

  constructor(private http: HttpClient) {}

  saveProfile(data: any): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.post(this.baseApiUrl + this.userApiPath, data, { headers });
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseApiUrl + this.userApiPath, { headers });
  }

  getAvailableIntolerances(): Observable<any> {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseApiUrl + this.intolerancePath, { headers });
  }

  getAvailableAllergies(): Observable<any> {
    const token = localStorage.getItem('jwtToken');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseApiUrl + this.allergyPath, { headers });
  }

}
