import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-reviews',
  standalone: true,
  templateUrl: './recipe-reviews.component.html',
  styleUrls: ['./recipe-reviews.component.css'],
})
export class RecipeReviewsComponent {
  onAddReview() { console.log('Recensione aggiunta!'); // Aggiungi qui il codice per gestire l'azione della recensione 
    }
}