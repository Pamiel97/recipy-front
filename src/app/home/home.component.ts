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
    this.recipeService.getRecipeByPantries().subscribe(r => {
      console.log(r);
      this.recipes = r;
    })
    this.recipeService.getRecipesByUser().subscribe(r => {
      console.log(r);
      this.userRecipes = r;
    })
  }
  // TEST
  onClickDiet(): void { 
    this.recipeService.getRecipesByDiet().subscribe(r => {
      console.log(r);
      this.recipesDiet = r;
    })
    this.diet = true;
  }
  onClickDifficulty():void {
    this.recipeService.getRecipesByDifficulty().subscribe(r => {
      console.log(r);
      this.recipesDifficulty = r;
    })
    this.difficulty = true;
  }
  onClickIntAndAll():void {
    this.recipeService.getRecipesByIntAndAll().subscribe(r => {
      console.log(r);
      this.recipesIntAndAll = r;
    })
    this.intAndAll = true;
  }

  //metodo per andare al detail di una ricetta cliccando la div
  navigate(id:number) {
    this.recipeService.getRecipeById(id).subscribe(r => {
      this.router.navigate(['recipe-detail', id])
    })
  }

}
