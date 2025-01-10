import { Component, OnInit } from '@angular/core';
import { IngredientDto } from '../../model/ingredients/ingredient-dto';

@Component({
  selector: 'app-ingredient-list',
  imports: [],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent implements OnInit{
  ingredients! : IngredientDto[];


  ngOnInit(): void {
    
  }

}
