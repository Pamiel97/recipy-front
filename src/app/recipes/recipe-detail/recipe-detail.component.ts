import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../model/recipes/recipe-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeDto } from '../../model/recipes/recipe-dto';
import { CommonModule } from '@angular/common';
import { IngredientService } from '../../model/ingredients/ingredient-service';
import { IngredientShareService } from '../../model/ingredients/ingredient-share-service';


@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {


  recipe: RecipeDto | null = null;
  ingredientNames: Map<number, string> = new Map(); //inserisce nella map gli ingredienti trovati, cosi non se i caric ogni volta se li trova

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute, private ingredientService: IngredientService, private ingredientShareService: IngredientShareService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!; // Ottiene il valore di :id come numero nel http
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
        if (this.recipe.recipeSteps) {
          this.recipe.recipeSteps.sort((a, b) => a.ordinal - b.ordinal);
        }
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
    if (!this.ingredientNames.has(ingredientId)) { //RIFERITO AL MAP DI PRIMA, controlla se è  già stato caricato quel determinato ingrediente
      this.ingredientService.getIngredientById(ingredientId).subscribe({
        next: (ingredient) => {
          this.ingredientNames.set(ingredientId, ingredient.name);
        },
        error: (err) => console.error(`Error loading ingredient ${ingredientId}:`, err),
      });
    }
  }

  getIngredientName(id: number): string {
    return this.ingredientNames.get(id) || 'Nessun ingrediente o ingrediente sconosciuto';
  }

  addToShoppingList(): void {
    if (this.recipe) {
      this.ingredientShareService.addIngredients(this.ingredientNames); // Aggiunge gli ingredienti accumulativamente
      console.log('Ingredients added to shopping list:', this.ingredientNames);
      this.router.navigate(['/shopping-list']); // Naviga verso ShoppingList
    }
  }
}
