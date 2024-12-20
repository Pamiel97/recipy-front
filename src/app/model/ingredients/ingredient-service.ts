import { Observable } from "rxjs";
import { IngredientDto } from "./ingredient-dto";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root' //DOVE INIETTARLO? 
  })
  export class IngredientService {
    constructor(private http: HttpClient) {} 
  
    getIngredientDto(): Observable<IngredientDto[]> {
      let params = new HttpParams();
      params = params.set("active", "true");  
  
      return this.http.get<IngredientDto[]>("http://localhost:8080/api/ingredients", { params });
    }
  }