import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewDto } from '../model/reviews/review-dto';
import { ReviewService } from '../model/reviews/review-service';
import { CommonModule } from '@angular/common'
import { AuthService } from '../model/login/auth-service';
import { UserDto } from '../model/users/user-dto';

@Component({
  selector: 'app-recipe-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  imports: [CommonModule]
})
export class ReviewsComponent implements OnInit {
  recipeId!: number;
  reviews: ReviewDto[] = [];
  currentUserId!: number;

  constructor(private router: Router, private route: ActivatedRoute, private service: ReviewService, private authService: AuthService) {}

  ngOnInit(): void {
    // Recupera l'ID della ricetta dall'URL
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadReviews();
    this.loadUser();
  };

  goToCreateReview(): void {
    // Naviga alla pagina di creazione recensione con l'ID della ricetta nel percorso
    this.router.navigate([`/create-review/${this.recipeId}`]);
  }

  loadReviews(): void {
    this.service.getReviewsByRecipe(this.recipeId).subscribe((data: ReviewDto[]) => {
      this.reviews = data;
    });
  }

  private loadUser(): void {
    this.authService.getUser().subscribe({
      next: u => this.currentUserId = u.id,
      error: () => ("User non trovato")
    })
  }

  onEditReview(review: any) {
    console.log('Modifica recensione:', review);
    // Qui puoi aprire un modal, navigare a un'altra pagina, o eseguire altra logica
  }
}
