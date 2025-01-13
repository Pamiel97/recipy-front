import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RecipeDto } from "./recipe-dto";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { IngredientDto as Ingredient} from '../../model/ingredients/ingredient-dto';


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

   //elimina ricette
    deleteRecipe(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    //update delle ricette
    updateRecipe(recipe: RecipeDto): Observable<RecipeDto> {
        return this.http.put<RecipeDto>(`${this.apiUrl}/${recipe.id}`, recipe);
    }

    getRecipeById(id: number): Observable<RecipeDto> {
        return this.http.get<RecipeDto>(`${this.apiUrl}/${id}`);
    }
    getRecipeByPantries(): Observable<RecipeDto[]> {
        return this.http.get<RecipeDto[]>(`http://localhost:8080/api/home/recipes-by-pantries`);
    }
    getRecipesByDiet(): Observable<RecipeDto[]> {
        return this.http.get<RecipeDto[]>(`http://localhost:8080/api/home/diet-compatible`);
    }
    getRecipesByDifficulty(): Observable<RecipeDto[]> {
        return this.http.get<RecipeDto[]>(`http://localhost:8080/api/home/difficulty`);
    }
    getRecipesByIntAndAll(): Observable<RecipeDto[]> {
        return this.http.get<RecipeDto[]>(`http://localhost:8080/api/home/allergies-intolerances`);
    }
    getRecipesByUser(): Observable<RecipeDto[]> {
        return this.http.get<RecipeDto[]>(`http://localhost:8080/api/home/user`);
    }
    getRecipesByTitle(title: string): Observable<RecipeDto[]> {
        return this.http.get<RecipeDto[]>(`http://localhost:8080/api/recipes/search/${title}`);
    }

    getAllRecipeByUtent(): Observable<RecipeDto[]>{
        return this.http.get<RecipeDto[]>(`http://localhost:8080/api/recipes/user/recipes`);
    }

    //sam -> prendo gli ingredienti mancanti per la shoppinglist
    getMissingIngredients(recipeId: number): Observable<Ingredient[]> {
        const url = `${this.apiUrl}/${recipeId}/missing-ingredients`;
        return this.http.get<Ingredient[]>(url);
    }

    getPaginatedRecipes(page: number, size: number) {
        const params = { page: page.toString(), size: size.toString() }; // Prepara i parametri
        return this.http.get<any>(`${this.apiUrl}/banana`, { params }); // Effettua la chiamata GET con i parametri
    }
}
