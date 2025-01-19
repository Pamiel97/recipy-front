import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RecipeAddFormComponent } from './recipes/recipe-add-form/recipe-add-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from "./home/home.component";
import { AuthService } from './model/login/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from './model/recipes/recipe-service';
import { UserDto } from './model/users/user-dto';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean = false;
  currentUser: UserDto | null = null;
  searchRecipe: string = '';

  constructor(private authService: AuthService, private router: Router, private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Sottoscrivi agli osservabili per ottenere l'autenticazione e l'utente
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    // Quando l'utente si disconnette
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  searchRecipes(): void {
    if (this.searchRecipe) {
      this.router.navigate(['/recipe-search', this.searchRecipe]);
    }
  }
}
