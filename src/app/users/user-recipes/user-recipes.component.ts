import { Component, OnInit } from '@angular/core';
import { RecipeDto } from '../../model/recipes/recipe-dto';
import { RecipeService } from '../../model/recipes/recipe-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-recipes',
  imports: [CommonModule],
  templateUrl: './user-recipes.component.html',
  styleUrl: './user-recipes.component.css'
})
export class UserRecipesComponent implements OnInit{

  recipes: RecipeDto[] = [];
  errorMessage: string = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipesByEmail().subscribe({
      next: (recipes) => {
        this.recipes = recipes; 
      },
      error: (err) => {
        this.errorMessage = 'Error fetching recipes';
        console.error(err); 
      },
    });
  }



}
