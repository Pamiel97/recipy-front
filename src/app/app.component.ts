import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { RecipeAddFormComponent } from './recipes/recipe-add-form/recipe-add-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from "./home/home.component";
import { AuthService } from './model/login/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, HttpClientModule, HomeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean = false;
  currentUser: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Sottoscrivi agli osservabili per ottenere l'autenticazione e l'utente
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authService.currentUser$.subscribe(userName => {
      this.currentUser = userName;
    });
  }

  logout(): void {
    // Quando l'utente si disconnette
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}