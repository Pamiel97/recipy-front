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
    

    //Capire come mandare il token senza parssarlo direttamente...
    createRecipe(recipe: RecipeDto): Observable<RecipeDto> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaXJrb3Jpc3VsZW9AZ21haWwuY29tIiwiaWF0IjoxNzM0NzcwNzc0LCJleHAiOjE3NjYzMDY3NzR9.pznH8UXKU_N15exNhi6r2WfELDN8k0VyCZIW3EwhX1s`
        });
    
        return this.http.post<RecipeDto>(this.apiUrl, recipe, { headers });
    }

}