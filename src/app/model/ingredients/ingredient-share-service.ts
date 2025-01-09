import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientShareService {
  private ingredients: Map<number, string> = new Map();

  addIngredients(newIngredients: Map<number, string>): void {
    newIngredients.forEach((name, id) => {
      this.ingredients.set(id, name); // Accumula gli ingredienti
    });
  }

  getIngredients(): Map<number, string> {
    return this.ingredients;
  }
}