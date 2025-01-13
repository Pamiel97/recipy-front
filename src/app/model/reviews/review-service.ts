import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewDto } from './review-dto'; // Assicurati che il DTO sia creato

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/api/reviews';
    constructor(private http: HttpClient){}
    private token = localStorage.getItem('jwtToken');

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('Token JWT mancante. Effettua il login.');
    }
  
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
  

  // Crea una recensione
  createReview(review: ReviewDto): Observable<ReviewDto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`});
      console.log('Payload inviato al backend:', review);
  
    return this.http.post<ReviewDto>(this.apiUrl, review, {headers});
  }

  // Ottieni tutte le recensioni per una specifica ricetta (tramite il suo ID)
  getReviewsByRecipe(recipeId: number): Observable<ReviewDto[]> {
    return this.http.get<ReviewDto[]>(`${this.apiUrl}/recipe/${recipeId}`);
  }

  // Ottieni tutte le recensioni di un utente specifico (tramite email o ID)
  getReviewsByUserEmail(): Observable<ReviewDto[]> {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      throw new Error('Email utente non trovata nel localStorage.');
    }
    return this.http.get<ReviewDto[]>(`${this.apiUrl}/user/email/${email}`);
  }

  // Elimina una recensione tramite il suo ID
  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${reviewId}`, {
      headers: this.getHeaders(),
    });
  }

  // Modifica una recensione
  updateReview(review: ReviewDto): Observable<ReviewDto> {
    return this.http.put<ReviewDto>(`${this.apiUrl}/${review.id}`, review, {
      headers: this.getHeaders(),
    });
  }

  // Ottieni una singola recensione tramite il suo ID
  getReviewById(reviewId: number): Observable<ReviewDto> {
    return this.http.get<ReviewDto>(`${this.apiUrl}/${reviewId}`);
  }

  // Ottieni tutte le recensioni di un utente autenticato
  getAllReviewsByUser(): Observable<ReviewDto[]> {
    return this.http.get<ReviewDto[]>(`${this.apiUrl}/user/reviews`);
  }
}
