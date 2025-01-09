import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientDto } from '../../model/ingredients/ingredient-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientService } from '../../model/ingredients/ingredient-service';
import { AuthService } from '../../model/login/auth-service';
import { UserDto } from '../../model/users/user-dto';
import { PantryDto } from '../../model/pantries/pantry-dto';
import { PantryService } from '../../model/pantries/pantry-service';

@Component({
  selector: 'app-edit-pantry',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-pantry.component.html',
  styleUrl: './edit-pantry.component.css'
})
export class EditPantryComponent implements OnInit{
  pantryForm!: FormGroup;
  ingredients!: IngredientDto[];
  user!: UserDto;
  pantryId!: number;
  pantry!: PantryDto;

  constructor(
    private ingredientService: IngredientService,
    private authService: AuthService,
    private fb: FormBuilder,
    private pantryService: PantryService,
    private router:Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.initializeForm();
    this.loadIngredients();
    this.loadPantryData();
    this.loadUser();
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

  //Carica la pantry in base all'id
  private loadPantryData(): void {
    this.pantryId = +this.route.snapshot.paramMap.get("id")!;
    console.log(this.pantryId);

    if (this.pantryId) {
      this.pantryService.getPantriesById(this.pantryId).subscribe({
        next: (pantry) => {
          console.log(pantry);
          this.populateForm(pantry);
          this.pantry = pantry;
          
        },
        error: () => alert("errore nel caricamento della pantry")
      });
    }
  }

   //Carica lo user
   private loadUser(): void {
    this.authService.getUser().subscribe({
      next: u => this.user = u,
      error: () => ("User non trovato")
    })
  }

  private initializeForm(): void{
    this.pantryForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(0)]],
      unitType: ['', [Validators.required]],
      purchaseDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      user: [this.user ? this.user.id : ''],
      ingredientId: ['', [Validators.required]],
      ingredientName: ['', [Validators.required]]
    })
  }

  private populateForm(pantry: PantryDto): void {
    this.pantryForm.patchValue({
      quantity: pantry.quantity,
      unitType: pantry.unitType,
      purchaseDate: pantry.purchaseDate,
      expirationDate: pantry.expirationDate,
      user: pantry.user,
      ingredientId: pantry.ingredientId,
      ingredientName: pantry.ingredientName
    });
  }

  updatePantry(): void{
    if(this.pantryForm.invalid) {
      console.error("Modulo non valido");
      return;
    }

    const updatedPantry: PantryDto = this.pantryForm.value;
    updatedPantry.id = this.pantryId;

    this.pantryService.updatePantry(updatedPantry).subscribe({
      next: () => this.router.navigate(['user-pantries']),
      error: () => console.log("Non siamo riusciti a modificare la pantry")
    });
  }

  onIngredientSelected(event: Event) {
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
