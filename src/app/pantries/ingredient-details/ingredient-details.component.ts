import { Component, OnInit } from '@angular/core';
import { IngredientDto } from '../../model/ingredients/ingredient-dto';
import { PantryService } from '../../model/pantries/pantry-service';
import { IngredientService } from '../../model/ingredients/ingredient-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient-details',
  imports: [CommonModule],
  templateUrl: './ingredient-details.component.html',
  styleUrl: './ingredient-details.component.css'
})
export class IngredientDetailsComponent implements OnInit{
  ingredient! : IngredientDto;
  
  constructor(private ingredientService : IngredientService, private pantryService: PantryService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!; // Ottiene il valore di :id come numero nel http
      if (!isNaN(id)) {
        this.loadIngredient(id);
      } else {
        console.error('Id non valido');
      }
    });
  }

  loadIngredient(id:number) {
    this.ingredientService.getIngredientById(id).subscribe({
      next: i => this.ingredient = i,
      error: () => alert('Dati mancanti o richiesta scaduta')
    })
  }



}
