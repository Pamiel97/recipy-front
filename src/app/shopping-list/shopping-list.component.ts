import { Component, OnInit } from '@angular/core';
import { IngredientShareService } from '../model/ingredients/ingredient-share-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-list',
  imports: [CommonModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit{

  ingredientList: { id: number; name: string }[] = [];

  constructor(private ingredientShareService: IngredientShareService) {}

  ngOnInit(): void {
    const ingredientsMap = this.ingredientShareService.getIngredients();
    this.ingredientList = Array.from(ingredientsMap, ([id, name]) => ({ id, name }));
    console.log('Loaded ingredient list:', this.ingredientList);
  }

}
