import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-reviews',
  standalone: true,
  templateUrl: './recipe-reviews.component.html',
  styleUrls: ['./recipe-reviews.component.css'],
})
export class RecipeReviewsComponent {
  constructor(private router: Router) {}

  goToCreateReview() {
    console.log('Recensione aggiunta!');
    this.router.navigate(['/create-review']); // Naviga alla pagina di creazione recensione
  }
}
