import { Component, OnInit } from '@angular/core';
import { RecipeDto } from '../../model/recipes/recipe-dto';
import { RecipeService } from '../../model/recipes/recipe-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-recipes',
  imports: [CommonModule],
  templateUrl: './user-recipes.component.html',
  styleUrl: './user-recipes.component.css'
})
export class UserRecipesComponent implements OnInit{

  recipes: RecipeDto[] = [];

  
  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  goToCreateRecipe(): void {
    this.router.navigate(['/create-recipe']);
  }

  goToEditRecipe(recipeId: number): void {
    this.router.navigate([`/edit-recipe/${recipeId}`]); 
  }


  loadRecipes(): void {
    this.recipeService.getRecipesByEmail().subscribe({
      next: (recipes) => {
        this.recipes = recipes; 
      },
      error: (err) => {
        console.error(err); 
      },
    });
  }

  
  deleteRecipe(id: number) {
     
    this.recipeService.deleteRecipe(id).subscribe(
      () => {
        alert('Ricetta eliminata con successo!'); 
        window.location.reload();
      },
      (error) => alert('Errore durante l\'eliminazione della ricetta.')
    ); 
  }

}
