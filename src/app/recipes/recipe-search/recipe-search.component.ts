import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../model/recipes/recipe-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-search',
  imports: [CommonModule],
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.css'
})
export class RecipeSearchComponent implements OnInit {
  title: string = '';  
  recipes: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.title = params['title'];  

      this.recipeService.getRecipesByTitle(this.title).subscribe(recipes => {
        this.recipes = recipes;
        this.loading = false;
      });
    });
  }


  goToRecipeDetail(recipeId: number): void {
    this.router.navigate(['/recipe-detail', recipeId]);
  }
}
