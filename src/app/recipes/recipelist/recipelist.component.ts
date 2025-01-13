import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RecipeService } from '../../model/recipes/recipe-service';
import { IngredientDto } from '../../model/ingredients/ingredient-dto';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recipelist',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit {

  recipes: any[] = [];
  currentPage: number = 1; // numero pagina attuale
  pageSize: number = 8;  // numero ricette per pagina
  totalRecipes: number = 0; // totale ricette disponibili
  missingIngredients: any[] = [];
  shoppingList: any[] = [];
  loading: boolean = true;
  showNoRecipesMessage: boolean = false;


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
    this.loading = true;
    this.recipeService.getPaginatedRecipes(this.currentPage - 1, this.pageSize).subscribe({
      next: (data) => {
        if (data) {
          this.recipes = data.content || [];
          this.totalRecipes = data.totalElements || 0;
          console.log('Ricette caricate:', this.recipes);
        }
        this.loading = false; // Nasconde l'indicatore di caricamento
      },
      error: (err) => {
        console.error('Errore durante il caricamento delle ricette:', err);
        this.loading = false; // Nasconde l'indicatore anche in caso di errore
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

  //sam -> ingredienti mancanti
  fetchMissingIngredients(recipeId: number): void {
    this.loading = true; // inizio il loading
    this.recipeService.getMissingIngredients(recipeId).subscribe(
      (ingredients) => {
        this.missingIngredients = ingredients;
        this.loading = false; // stoppo il loading dopo il fetch
        console.log('Ingredienti mancanti:', this.missingIngredients);
      },
      (error) => {
        console.error('Errore nel fetch degli ingredienti mancanti', error);
        this.loading = false; // stoppo il loading anche in caso di errori
      }
    );
  }

  //sam -> aggiungo alla shopping list
  addToShoppingList(recipeId: number): void {
    this.shoppingList = [...this.shoppingList, ...this.missingIngredients];
    console.log('Aggiunto alla lista della spesa:', this.shoppingList);
  }

  //sam -> dico che la shopping list è completata
  markShoppingListAsCompleted(): void {
    console.log('Lista della spesa completata:', this.shoppingList);
    // logica per mandare la shopping list al backend
    //TODO
    this.shoppingList = [];
  }

}
