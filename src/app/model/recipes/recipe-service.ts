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
    

    createRecipe(recipe: RecipeDto): Observable<RecipeDto> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<RecipeDto>(this.apiUrl, recipe, { headers });
    }

}