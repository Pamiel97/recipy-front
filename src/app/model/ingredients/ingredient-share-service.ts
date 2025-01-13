import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientShareService {
  private ingredients: Map<number, string> = new Map();

  // Aggiunge nuovi ingredienti accumulandoli
  addIngredients(newIngredients: Map<number, string>): void {
    newIngredients.forEach((name, id) => {
      this.ingredients.set(id, name); // Accumula gli ingredienti
    });
  }

  // Restituisce tutti gli ingredienti accumulati
  getIngredients(): Map<number, string> {
    return this.ingredients;
  }

  // Resetta gli ingredienti
  resetIngredients(): void {
    this.ingredients.clear(); // Cancella tutti gli ingredienti
    console.log('Lista degli ingredienti resettata!');
  }
}
