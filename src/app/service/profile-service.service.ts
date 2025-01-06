import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private apiUrl = 'https://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  saveProfile(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
