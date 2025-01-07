import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RecipeDto } from "./recipe-dto";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class RecipeService{
    private apiUrl = 'http://localhost:8080/api/recipes';
    constructor(private http: HttpClient){}
    private token = localStorage.getItem('jwtToken');
    

    
    createRecipe(recipe: RecipeDto): Observable<RecipeDto> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        });
    
        return this.http.post<RecipeDto>(this.apiUrl, recipe, { headers });
    }


    //GET PER AVERE LE RICETTE TRAMITE EMAIL UTENTE PRESO DAL LOCAL STORAGE
    getRecipesByEmail(): Observable<RecipeDto[]> {
        const email = localStorage.getItem('userEmail'); // Recupera l'email dal localStorage
        if (!email) {
          throw new Error('Nessuna ricetta trovata');
        }
        //aggiunge l'email preso come parmetro                         
        return this.http.get<RecipeDto[]>(`${this.apiUrl}/user/email/${email}`);
    }

   //elimina ricett
    deleteRecipe(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    //udat delle ricette
    updateRecipe(recipe: RecipeDto): Observable<RecipeDto> {
        return this.http.put<RecipeDto>(`${this.apiUrl}/${recipe.id}`, recipe);
    }

    getRecipeById(id: number): Observable<RecipeDto> {
        return this.http.get<RecipeDto>(`${this.apiUrl}/${id}`);
    }

    getRecipeByPantries(): Observable<RecipeDto[]> {
        // const email = localStorage.getItem('userEmail');
        // if(!email) {
        //     throw new Error('nessuna ricetta trovata');
        // }
        return this.http.get<RecipeDto[]>(`http://localhost:8080/api/home/recipes-by-pantries`);
    }

    getRecipesByTitle(title: string): Observable<RecipeDto[]> {
        return this.http.get<RecipeDto[]>(`http://localhost:8080/api/recipes/search/${title}`);
    }

}