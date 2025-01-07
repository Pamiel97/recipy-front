import { Component, OnInit } from '@angular/core';
import { RecipeDto } from '../model/recipes/recipe-dto';
import { RecipeService } from '../model/recipes/recipe-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  recipes! : RecipeDto[];

  constructor(private recipeService: RecipeService) {

  }
  ngOnInit(): void {
    this.recipeService.getRecipeByPantries().subscribe(r => {
      console.log(r);
      this.recipes = r;
    })
  }
}
