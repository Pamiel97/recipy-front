import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipelist',
  imports: [HttpClientModule],
  templateUrl: './recipelist.component.html',
  styleUrl: './recipelist.component.css'
})
export class RecipelistComponent implements OnInit{
  ngOnInit(): void {
  }

  constructor(private router: Router){}

  // goToCreateRecipe(): void {
  //   this.router.navigate(['/create-recipe']);
  // }

}
