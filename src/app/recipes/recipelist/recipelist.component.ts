import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../model/recipes/recipe-service';
import { IngredientDto as Ingredient } from '../../model/ingredients/ingredient-dto';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit {
  missingIngredients: Ingredient[] = [];
  shoppingList: Ingredient[] = [];
  loading: boolean = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Aggiungo la logica iniziale se necessario
  }

  fetchMissingIngredients(recipeId: number): void {
    this.loading = true; // Inizio il loading
    this.recipeService.getMissingIngredients(recipeId).subscribe(
      (ingredients) => {
        this.missingIngredients = ingredients;
        this.loading = false; // Stoppo il loading dopo il fetch
        console.log('Missing Ingredients:', this.missingIngredients);
      },
      (error) => {
        console.error('Error fetching missing ingredients:', error);
        this.loading = false; // Stoppo il loading anche con errori
      }
    );
  }

  addToShoppingList(recipeId: number): void {
    this.shoppingList = [...this.shoppingList, ...this.missingIngredients];
    console.log('Added to shopping list:', this.shoppingList);
  }

  markShoppingListAsCompleted(): void {
    console.log('Marking shopping list as completed:', this.shoppingList);
    // Resetto la shoppinglist
    this.shoppingList = [];
  }
}
