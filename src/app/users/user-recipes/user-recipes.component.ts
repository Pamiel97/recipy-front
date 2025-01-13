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
  page: number = 1;
  size: number = 8;
  totalRecipes: number = 0;
  loading: boolean = false;


  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.loadPaginatedRecipes();
  }

  goToCreateRecipe(): void {
    this.router.navigate(['/create-recipe']);
  }

  goToEditRecipe(recipeId: number): void {
    this.router.navigate([`/edit-recipe/${recipeId}`]);
  }

  goToDetailRecipe(recipeId: number): void {
    this.router.navigate([`/recipe-detail/${recipeId}`]);
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipeByUtent().subscribe({
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

  loadPaginatedRecipes(): void {
    this.loading = true;
    this.recipeService.getUserPaginatedRecipes(this.page -1, this.size).subscribe({
      next: (r) => {
        this.recipes = r.content;
        this.totalRecipes = r.totalElements;
        this.loading = false;
      },
      error: () => {
        console.log("Error")
        this.loading = false;
      }
    })
  }

  totalPages(): number {
    return Math.ceil(this.totalRecipes/this.size);
  }

  onPageChange(newPage:number) {
    this.page = newPage;
    this.loadPaginatedRecipes();
  }

}
