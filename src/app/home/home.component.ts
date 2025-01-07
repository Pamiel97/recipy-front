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

  constructor(private recipeService: RecipeService, private router: Router) {

  }
  ngOnInit(): void {
    this.recipeService.getRecipeByPantries().subscribe(r => {
      console.log(r);
      this.recipes = r;
    })
  }
  
  //metodo per andare al detail di una ricetta cliccando la div
  navigate(id:number) {
    this.recipeService.getRecipeById(id).subscribe(r => {
      this.router.navigate(['recipe-detail', id])
    })
  }

}
