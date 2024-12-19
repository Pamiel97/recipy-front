import { HttpClient } from "@angular/common/http";

export class RecipeService{
    private urlExtension: string = "/api/recipes"
    constructor(private http: HttpClient){}
    
}