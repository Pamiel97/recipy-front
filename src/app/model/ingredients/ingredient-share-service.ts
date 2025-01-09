import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Il servizio sarà disponibile in tutta l'app
})
export class IngredientShareService {
  private ingredients: Map<number, string> = new Map();

  setIngredients(ingredients: Map<number, string>): void {
    this.ingredients = ingredients;
  }

  getIngredients(): Map<number, string> {
    return this.ingredients;
  }
}