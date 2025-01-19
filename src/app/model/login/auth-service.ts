import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginDto } from "./login-dto";
import { BehaviorSubject, Observable } from "rxjs";
import { TokenResponse } from "./token-response";
import { HttpConfig } from "../../config/http-config";
import { RegisterDto } from "./register-dto";
import { jwtDecode } from 'jwt-decode';  // Assicurati che l'importazione sia corretta
import { UserDto } from "../../model/users/user-dto";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  urlExtension = '/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<UserDto | null>(null); // Modifica il tipo per essere UserDto

  // Observable per il componente Navbar
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Controlla se l'utente ha un token nel localStorage al caricamento
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decodifica il token per ottenere i dati utente
        this.isAuthenticatedSubject.next(true);

        // Crea un oggetto UserDto con i dati decodificati
        const user: UserDto = {
          id: decodedToken.userId || null, // Assicurati che i dati siano corretti
          firstname: decodedToken.firstname || '',
          lastname: decodedToken.lastname || '',
          profile: decodedToken.profile || '', // Gestione della mancanza di 'profile'
        };

        // Imposta l'utente corrente
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error("Errore nel decodificare il token:", error);
        this.isAuthenticatedSubject.next(false);
      }
    }
  }

  login(login: LoginDto): Observable<TokenResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<TokenResponse>(`${HttpConfig.apiUrl}${this.urlExtension}/login`, login, { headers });
  }

  loginSuccessful(user: UserDto): void {
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(user); // Imposta l'oggetto UserDto
  }
  

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);

    // Rimuovi il token dal localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userEmail');
  }

  register(r: RegisterDto): Observable<RegisterDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<RegisterDto>(`${HttpConfig.apiUrl}${this.urlExtension}/register`, r, { headers });
  }

  getUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }
}
