import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PantryDto } from "./pantry-dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PantryService{
    private apiUrl = 'http://localhost:8080/api/pantries';
    constructor(private http:HttpClient){}
    private token = localStorage.getItem('jwtToken');

    getPantries(): Observable<PantryDto[]> {
        return this.http.get<PantryDto[]>(this.apiUrl);
    }

    getPantriesById(pantryId: number): Observable<PantryDto> {
        return this.http.get<PantryDto>(`${this.apiUrl}/${pantryId}`)
    }

    createPantry(pantry:PantryDto): Observable<PantryDto> {
        const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            });
        
        return this.http.post<PantryDto>(this.apiUrl, pantry, {headers});
    }

    deletePantry(id: number): Observable<void> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        });

        return this.http.delete<void>(`${this.apiUrl}/${id}`, {headers});
    }

    updatePantry(pantry: PantryDto): Observable<PantryDto> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        });

        return this.http.put<PantryDto>(`${this.apiUrl}/${pantry.id}`, pantry, {headers});
    }

    getPaginatedPantries(page: number, size: number): Observable<any> {
        const params = {page: page.toString(), size: size.toString() };
        return this.http.get<any>(`${this.apiUrl}/user.s`, {params});
    }
}