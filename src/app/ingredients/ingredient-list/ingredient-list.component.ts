import { Component, OnInit } from '@angular/core';
import { IngredientDto } from '../../model/ingredients/ingredient-dto';
import { IngredientService } from '../../model/ingredients/ingredient-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient-list',
  imports: [CommonModule],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent implements OnInit{
  ingredients! : IngredientDto[];
  currentPage: number = 1;
  pageSize: number = 16;
  totalIngredients: number = 0;
  loading: boolean = true;

  constructor(private ingredientService:IngredientService, private router:Router) {}

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.loading = true;
    this.ingredientService.getAllImpaginatedIngredents(this.currentPage -1, this.pageSize).subscribe({
      next: (data) => {
        console.log(data)
        this.ingredients = data.content;
        this.totalIngredients = data.totalElements;
        this.loading = false;
      },
      error: () => console.log("C'è qualquadra che non cosa")
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadIngredients();
  }

  totalPages(): number {
    return Math.ceil(this.totalIngredients / this.pageSize);
  }

  navigateToIngredient(id: number) {
    return this.router.navigate(['ingredient-details', id]);
  }

  //metodo per rimuovere i trattini bassi delle categories
  normalizeString(input: string): string {
    return input.replace(/_/g, ' '); // Sostituisce tutti i trattini bassi con spazi
  }
}
