import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientService } from '../../model/ingredients/ingredient-service';
import { IngredientDto } from '../../model/ingredients/ingredient-dto';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../model/login/auth-service';
import { PantryService } from '../../model/pantries/pantry-service';
import { PantryDto } from '../../model/pantries/pantry-dto';
import { Router } from '@angular/router';
import { UserDto } from '../../model/users/user-dto';

@Component({
  selector: 'app-pantry-add-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pantry-add-form.component.html',
  styleUrl: './pantry-add-form.component.css'
})
export class PantryAddFormComponent implements OnInit{
  pantryForm!: FormGroup;
  ingredients!: IngredientDto[];
  user!: UserDto;

  constructor(private pantryService:PantryService, 
              private ingredientService:IngredientService, 
              private fb:FormBuilder, 
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadIngredients();
    this.loadUser();
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

  //USER
  private loadUser(): void {
    this.authService.getUser().subscribe({
      next: u => this.user = u,
      error: () => ("User non trovato")
    })
  }

  private initializeForm(): void {
    this.pantryForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(0)]],
      unitType: ['', [Validators.required]],
      purchaseDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      user: [this.user ? this.user.id : ''],
      ingredientId: ['', [Validators.required]],
      ingredientName: ['', [Validators.required]]
    });
  }

  savePantry(): void {
    if (this.pantryForm.invalid) {
      console.error("Modulo non valido");
      return;
    }

    const rightPantryForm : PantryDto = this.pantryForm.value;

    this.pantryService.createPantry(rightPantryForm).subscribe({
      next: () => this.router.navigate(['user-pantries']),
      error: () => {
        console.log('La creazione della pantry non è andata a buon fine');
        this.router.navigate(['user-pantries'])
      }
    })
  }

  onIngredientSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectIngredientName = selectElement.value;
    
    const selectedIngredient = this.ingredients.find(ingredient => ingredient.name == selectIngredientName);
    if(selectedIngredient) {
      this.pantryForm.patchValue({
        ingredientId: selectedIngredient.id,
        ingredientName: selectedIngredient.name
      });
    }
  }

}
