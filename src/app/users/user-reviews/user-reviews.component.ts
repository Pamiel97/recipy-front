import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { ReviewService } from '../../model/reviews/review-service';
import { ReviewDto } from '../../model/reviews/review-dto';

@Component({
  selector: 'app-user-reviews',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {
  private reviewService = inject(ReviewService); // <-- Iniezione del servizio
  userReviews: ReviewDto[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  ngOnInit() {
    this.getUserReviews();
  }

  getUserReviews() {
    this.reviewService.getAllReviewsByUser().subscribe({
      next: (reviews) => {
        this.userReviews = reviews;
        this.loading = false;
      },
      error: (error) => {
        console.error('Errore nel recupero delle recensioni:', error);
        this.errorMessage = 'Errore nel caricamento delle recensioni.';
        this.loading = false;
      }
    });
  }
}
