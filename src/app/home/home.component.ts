import { Component, OnInit } from '@angular/core';
import { RecipeDto } from '../model/recipes/recipe-dto';
import { RecipeService } from '../model/recipes/recipe-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  recipes! : RecipeDto[];
  
  userRecipes! : RecipeDto[];
  recipesDiet! : RecipeDto[];
  recipesDifficulty!: RecipeDto[];
  recipesIntAndAll!: RecipeDto[];
  diet: boolean = false;
  difficulty: boolean = false;
  intAndAll: boolean = false;

  constructor(private recipeService: RecipeService, private router: Router) {

  }

  ngOnInit(): void {
    this.recipeService.getRecipeByPantries().subscribe({
      next: r => {
      console.log(r);
      this.recipes = r;
      },
      error: () => alert('Dati mancanti o richiesta troppo lenta')
  })
  
    this.recipeService.getRecipesByUser().subscribe({
      next: r => {
      console.log(r);
      this.userRecipes = r;
      },
      error: () => alert('Dati mancanti o richiesta troppo lenta')
    })
  }
  // TEST
  onClickDiet(): void { 
    this.recipeService.getRecipesByDiet().subscribe({
      next: r => {
      console.log(r);
      this.recipesDiet = r;
      },
      error: () => alert('Dati mancanti o richiesta troppo lenta')
    })
    this.diet = true;
  }
  onClickDifficulty():void {
    this.recipeService.getRecipesByDifficulty().subscribe({
      next: r => {
      console.log(r);
      this.recipesDifficulty = r;
      },
      error: () => alert('Dati mancanti o richiesta troppo lenta')
    })
    this.difficulty = true;
  }
  onClickIntAndAll():void {
    this.recipeService.getRecipesByIntAndAll().subscribe({
      next: r => {
      console.log(r);
      this.recipesIntAndAll = r;
      },
      error: () => alert('Dati mancanti o richiesta troppo lenta')
    })
    this.intAndAll = true;
  }
  
  //metodo per andare al detail di una ricetta cliccando la div
  navigate(id:number) {
    this.recipeService.getRecipeById(id).subscribe({
      next: () => {
      this.router.navigate(['recipe-detail', id])
      },
      error: () => alert('Dati mancanti o richiesta troppo lenta')
    })
  }

}
