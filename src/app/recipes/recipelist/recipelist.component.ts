import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RecipeService } from '../../model/recipes/recipe-service';

@Component({
  selector: 'app-recipelist',
  imports: [HttpClientModule],
  templateUrl: './recipelist.component.html',
  styleUrl: './recipelist.component.css'
})
export class RecipelistComponent implements OnInit {

  recipes: any[] = [];
  currentPage: number = 1; // numero pagina attuale
  pageSize: number = 10;  // numero ricette per pagina
  totalRecipes: number = 0; // totale ricette disponibili

  constructor(
    private router: Router, 
    private recipeService: RecipeService
  ) { }


  ngOnInit(): void {
    this.loadRecipes();
  }

  navigate(id:number) {
    this.recipeService.getRecipeById(id).subscribe(r => {
      this.router.navigate(['recipe-detail', id])
    })
  }

  loadRecipes(): void {
    this.recipeService.getPaginatedRecipes().subscribe({
      next: (data) => {
        if (data) {
          this.recipes = data.content || [];
          this.totalRecipes = data.totalElements || 0;
        }
      },
      error: (err) => {
        console.error('Errore durante il caricamento delle ricette:', err);
      }
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadRecipes();
  }

  totalPages(): number {
    return Math.ceil(this.totalRecipes / this.pageSize);
  }

  // goToCreateRecipe(): void {
  //   this.router.navigate(['/create-recipe']);
  // }
}
