import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Aggiungi CommonModule

@Component({
  selector: 'app-create-review',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Aggiungi CommonModule qui
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css'],
})
export class CreateReviewComponent {
  review = { text: '', rating: 0 };  // Inizializza la recensione
  hoveredRating: number = 0;  // Inizializza la valutazione hover

  // Gestisce il clic sulle stelle per assegnare il voto
  setRating(rating: number) {
    this.review.rating = rating;
  }

  // Gestisce l'effetto hover per cambiare il colore delle stelle
  hoverRating(rating: number) {
    this.hoveredRating = rating;
  }

  // Funzione per il submit del form
  onSubmit() {
    if (this.review.rating && this.review.text) {
      console.log('Recensione inviata:', this.review);
      alert('Pam De Pippis!, grazie della recensione!');
    } else {
      alert('Compila tutti i campi prima di inviare!');
    }
  }
}
