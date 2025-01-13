import { Component, OnInit } from '@angular/core';
import { RecipeDto } from '../../model/recipes/recipe-dto';
import { RecipeService } from '../../model/recipes/recipe-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientDto } from '../../model/ingredients/ingredient-dto';
import { IngredientService } from '../../model/ingredients/ingredient-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-recipe',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  ingredients: IngredientDto[] = [];
  recipeId: number | null = null;
  recipe: RecipeDto | null = null;

  constructor(
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadIngredients();
    this.loadRecipeData();
  }

  // Carica gli ingredienti
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


  private loadRecipeData(): void {
    this.recipeId = +this.route.snapshot.paramMap.get('id')!;  //prende id in base al router 

    if (this.recipeId) {
      this.recipeService.getRecipeById(this.recipeId).subscribe({
        next: (recipe) => {
          this.recipe = recipe;
          this.populateForm(recipe);
        },
        error: (err) => {
          console.error('Errore nel caricamento della ricetta:', err);
        }
      });
    }
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
      imgUrl: ['',],
      tags: this.fb.array([]),
      recipeSteps: this.fb.array([]),
    });
  }


  get recipeSteps(): FormArray {
    return this.recipeForm.get('recipeSteps') as FormArray;
  }


  // addRecipeStep(): void {
  //   const recipeStep = this.fb.group({ 
  //     description: [''],
  //     ordinal: [],
  //     stepImgUrl: [''],
  //     ingredientId: [null]
  //   });
  //   this.recipeSteps.push(recipeStep);  
  // }


  // removeRecipeStep(index: number): void {
  //   this.recipeSteps.removeAt(index);  
  // }

  private populateForm(recipe: RecipeDto): void {
    const imgUrl = recipe.imgUrl ? recipe.imgUrl : '';
    this.recipeForm.patchValue({
      title: recipe.title,
      description: recipe.description,
      course: recipe.course,
      prepTime: recipe.prepTime,
      cookingTime: recipe.cookingTime,
      difficulty: recipe.difficulty,
      kCalories: recipe.kCalories,
      imgUrl: imgUrl
    });

    console.log(imgUrl);

    if (recipe.recipeSteps && recipe.recipeSteps.length > 0) {
      recipe.recipeSteps.sort((a, b) => a.ordinal - b.ordinal);
      recipe.recipeSteps.forEach(step => {
        const stepGroup = this.fb.group({
          id: [step.id], // Aggiungi l'ID
          description: [''],
          ordinal: [],
          stepImgUrl: [''],
          ingredientId: [null]
        });
        this.recipeSteps.push(stepGroup);
      });
      this.recipeSteps.controls.forEach((stepCtrl, index) => {
        stepCtrl.patchValue(recipe.recipeSteps[index]);
      });
    }
  }

  updateRecipe(): void {
    if (this.recipeForm.invalid) {
      console.error('Il modulo non è valido!');
      return;
    }

    const updatedRecipeDto: RecipeDto = this.recipeForm.value;
    updatedRecipeDto.id = this.recipeId!;

    //PER AGGIUNGERE EVENTALI STEP NUOVI
    // updatedRecipeDto.recipeSteps = updatedRecipeDto.recipeSteps.map((step: any) => {
    //   // if (step.id === undefined || step.id === 0) {
    //   //   step.id = 0; 
    //   // }
    //  // return step;
    // });

    console.log('Updated Recipe:', updatedRecipeDto);


    this.recipeService.updateRecipe(updatedRecipeDto).subscribe({
      next: () => {
        console.log('Ricetta aggiornata');
        this.router.navigate(['/user-recipes']);
      },
      error: (err) => {
        console.error('Errore nell\'aggiornamento della ricetta:', err);
        console.log('Payload inviato:', JSON.stringify(updatedRecipeDto, null, 2));
      }
    });
  }

  onFileSelected(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement; if (input.files && input.files[0]) {
      const file = input.files[0]; console.log(`${controlName} selected file:`, file.name);
    }
  }
}