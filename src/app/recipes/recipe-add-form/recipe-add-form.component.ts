import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientDto } from '../../model/ingredients/ingredient-dto';
import { RecipeService } from '../../model/recipes/recipe-service';
import { IngredientService } from '../../model/ingredients/ingredient-service';
import { Route, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recipe-add-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './recipe-add-form.component.html',
  styleUrl: './recipe-add-form.component.css'
})
export class RecipeAddFormComponent implements OnInit {
 
 ingredients: IngredientDto[] = [];
 recipeForm!: FormGroup;

 constructor(
  private ingredientService: IngredientService,
  private recipeService: RecipeService,
  private fb: FormBuilder, 
  private router: Router
 ){}


  ngOnInit(): void {

    this.recipeForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(10)]],
      course: ["", [Validators.required]],
      prepTime: ["", [Validators.required, Validators.min(1)]],
      cookingTime: ["", [Validators.required, Validators.min(1)]],
      difficulty: ["", [Validators.required]],
      kCalories: ["", [Validators.required, Validators.min(1)]],
      imgUrl: ["",],
      tags: this.fb.array([]),  
      recipeSteps: this.fb.array([]),  
    });
   


    this.ingredientService.getIngredientDto().subscribe({
      next: (i) => this.ingredients = i,
      error: (e) => console.log(e)
    });
  }


  

  



}
