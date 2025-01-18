import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../model/reviews/review-service';
import { ReviewDto } from '../../model/reviews/review-dto';
import { CommonModule } from '@angular/common'; 
import { RecipeService } from '../../model/recipes/recipe-service'; 
import { RecipeDto } from '../../model/recipes/recipe-dto';
import { UserDto } from '../../model/users/user-dto';

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css'],
})
export class CreateReviewComponent implements OnInit {
  reviewForm!: FormGroup;
  hoveredRating: number = 0; // Gestisce il rating hover per le stelle
  recipeId!: number; // ID della ricetta da recensire
  // recipe!: RecipeDto;

  constructor(
    private recipeService: RecipeService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  // Recupera l'ID della ricetta dai parametri di percorso
  const recipeIdParam = this.route.snapshot.paramMap.get('id');
  this.recipeId = recipeIdParam ? Number(recipeIdParam) : NaN; // Se non c'è, usa NaN

  if (isNaN(this.recipeId)) {
    alert('ID ricetta mancante!');
    this.router.navigate(['/']); // Torna alla homepage o altra pagina
    return;
  }

    // Usa il servizio per caricare la ricetta
    // this.loadRecipe(this.recipeId);
  this.initializeForm();
}

// private loadRecipe(id: number): void {
//   this.recipeService.getRecipeById(id).subscribe({
//     next: (recipe) => {
//       this.recipe = recipe;
//       console.log('Recipe loaded:', this.recipe);
//     },
//     error: (err) => {
//       console.error('Error loading recipe:', err);
//     },
//   });
// }

  private initializeForm(): void {
    this.reviewForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]], // Commento obbligatorio
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]], // Rating tra 1 e 5
    });
  }

  // Gestisce il clic sulle stelle per assegnare il voto
  setRating(rating: number): void {
    this.reviewForm.patchValue({ rating });
  }

  // Gestisce l'effetto hover per cambiare il colore delle stelle
  hoverRating(rating: number): void {
    this.hoveredRating = rating;
  }

  // Metodo per salvare la recensione
  saveReview(): void {
    if (this.reviewForm.invalid) {
      alert('Per favore, compila tutti i campi correttamente.');
      return;
    }
  
    const review = {
      ...this.reviewForm.value,
      recipeId: this.recipeId, // Invia solo l'ID della ricetta
      userId: this.getUserFromLocalStorage()?.id, // Recupera solo l'ID dell'utente
      creationDate: new Date().toISOString(), // Data di creazione
    };
  
    console.log('Payload inviato al backend:', review);
  
    this.reviewService.createReview(review).subscribe({
      next: () => {
        alert('Recensione salvata con successo!');
        this.router.navigate(['/recipe-details', this.recipeId]);
      },
      error: (err) => {
        console.error('Errore durante il salvataggio della recensione:', err);
      },
    });
  }
  
  
  private getUserFromLocalStorage(): UserDto {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  
}  