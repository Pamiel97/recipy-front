import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-reviews',
  standalone: true,
  templateUrl: './recipe-reviews.component.html',
  styleUrls: ['./recipe-reviews.component.css'],
})
export class RecipeReviewsComponent implements OnInit {
  recipeId!: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Recupera l'ID della ricetta dall'URL
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
  }

  goToCreateReview(): void {
    // Naviga alla pagina di creazione recensione con l'ID della ricetta nel percorso
    this.router.navigate([`/create-review/${this.recipeId}`]);
  }
  
  
}