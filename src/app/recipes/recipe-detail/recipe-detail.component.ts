import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../model/recipes/recipe-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDto } from '../../model/recipes/recipe-dto';
import { CommonModule } from '@angular/common';
import { IngredientService } from '../../model/ingredients/ingredient-service';
import { IngredientShareService } from '../../model/ingredients/ingredient-share-service';
import { RecipeReviewsComponent } from '../../recipe-reviews/recipe-reviews.component'; // Import del componente reviews

@Component({
  selector: 'app-recipe-detail',
  standalone: true, // Conferma che è un componente Standalone
  imports: [CommonModule, RecipeReviewsComponent], // Aggiungi RecipeReviewsComponent qui
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: RecipeDto | null = null;
  ingredientNames: Map<number, string> = new Map(); // Inserisce nella map gli ingredienti trovati, cosi non se li carica ogni volta se li trova

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private ingredientShareService: IngredientShareService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!; // Ottiene il valore di :id come numero
      if (!isNaN(id)) {
        this.loadRecipe(id);
      } else {
        console.error('Id non valido');
      }
    });
  }

  loadRecipe(id: number): void {
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        console.log('Recipe loaded:', this.recipe);

        this.recipe.recipeSteps.forEach((step) => {
          this.loadIngredientName(step.ingredientId);
        });
      },
      error: (err) => {
        console.error('Error loading recipe:', err);
      },
    });
  }

  loadIngredientName(ingredientId: number): void {
    if (!this.ingredientNames.has(ingredientId)) {
      // Controlla se è già stato caricato quel determinato ingrediente
      this.ingredientService.getIngredientById(ingredientId).subscribe({
        next: (ingredient) => {
          this.ingredientNames.set(ingredientId, ingredient.name);
        },
        error: (err) =>
          console.error(`Error loading ingredient ${ingredientId}:`, err),
      });
    }
  }

  getIngredientName(id: number): string {
    return this.ingredientNames.get(id) || 'Nessun ingrediente o ingrediente sconosciuto';
  }

  onAddToShoppingList(): void {
    if (this.recipe) {
      this.ingredientShareService.addIngredients(this.ingredientNames); // Aggiunge gli ingredienti accumulativamente
      console.log('Ingredients added to shopping list:', this.ingredientNames);
      this.router.navigate(['/shopping-list']); // Naviga verso ShoppingList
    }
  }
}
