import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto } from "./login-dto";
import { BehaviorSubject, Observable } from "rxjs";
import { TokenResponse } from "./token-response";
import { HttpConfig } from "../../config/http-config";
import { RegisterDto } from "./register-dto";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
   
    urlExtension = '/api/auth';
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    private currentUserSubject = new BehaviorSubject<string | null>(null);
  
    // Observable per il componente Navbar
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    currentUser$ = this.currentUserSubject.asObservable();
  
    constructor(private http: HttpClient) {
      // Controlla se l'utente ha un token nel localStorage al caricamento
      const token = localStorage.getItem('jwtToken');
      if (token) {
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next('User');  // Puoi sostituire con il nome utente del token se disponibile
      }
    }
  
    login(login: LoginDto): Observable<TokenResponse> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      return this.http.post<TokenResponse>(`${HttpConfig.apiUrl}${this.urlExtension}/login`, login, {headers});
    }
  
    loginSuccessful(userName: string): void {
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(userName);
    }
  
    logout(): void {
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next(null);
      
      localStorage.removeItem('jwtToken'); // Rimuovi il token dal localStorage
      localStorage.removeItem('userEmail'); //Rimuovi email dal LocalStorage
    }

    register(r: RegisterDto): Observable<RegisterDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<RegisterDto>(`${HttpConfig.apiUrl}${this.urlExtension}/register`, r, {headers});
    }

    getUser(): Observable<any> {
      return this.currentUserSubject.asObservable();
    }
}
