import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from '../../model/recipes/recipe-service';
import { Router } from '@angular/router';
import { Difficulty } from '../../model/recipes/difficulty.enum';
import { RecipeDto } from '../../model/recipes/recipe-dto';
import { UserDto } from '../../model/users/user-dto';
import { IngredientService } from '../../model/ingredients/ingredient-service';  // Aggiungi il servizio IngredientService
import { IngredientDto } from '../../model/ingredients/ingredient-dto';  // Importa IngredientDto
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-add-form',
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-add-form.component.html',
  styleUrls: ['./recipe-add-form.component.css']
})
export class RecipeAddFormComponent implements OnInit {
  recipeForm!: FormGroup;
  ingredients: IngredientDto[] = [];  

  

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService, 
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadIngredients();  
  }

  //INGREDIENTI
  private loadIngredients(): void {
    this.ingredientService.getIngredientDto().subscribe({
      next: (data) => {
        this.ingredients = data;  
      },
      error: (err) => {
        console.error('Errore nel caricamento degli ingredienti:', err);
      }
    });
  }

  
  private initializeForm(): void {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      course: ['', [Validators.required]],
      prepTime: ['',],
      cookingTime: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      kCalories: ['',],
      imgUrl: ['', ],
      tags: this.fb.array([]),
      recipeSteps: this.fb.array([]),  
    });
  }

  // grazie sommo per avermi detto esisteva sta cosa 
  get recipeSteps(): FormArray {
    return this.recipeForm.get('recipeSteps') as FormArray;
  }

  
  addRecipeStep(): void {
    const ricetteStep = this.fb.group({
      description: [''],
      ordinal:[],
      stepImgUrl: [''],
      ingredientId: [null] 
    });
    this.recipeSteps.push(ricetteStep);  //aggiunge questo nel array
  }

  
  removeRecipeStep(index: number): void {
    this.recipeSteps.removeAt(index);  
  }

  
  saveRecipe(): void {
    if (this.recipeForm.invalid) {
      console.error('il modulo non è valdo');
      return;
    }

    const ricettaCompilata = this.recipeForm.value;


   
    this.recipeService.createRecipe(ricettaCompilata).subscribe({
      next: () => {
  
        this.router.navigate(['/search-recipe']); // scegliere dove farlo navigare poi...
      },
      error: (err) => {
        console.error('Errore nel salvataggio della ricetta:', err);
        console.log('Recipe Payload:', ricettaCompilata);
      }
    });
  }
}
