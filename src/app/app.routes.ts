import { Routes } from '@angular/router';
import { RecipeAddFormComponent } from './recipes/recipe-add-form/recipe-add-form.component';
import { RecipelistComponent } from './recipes/recipelist/recipelist.component';

export const routes: Routes = [
    { path: 'create-recipe', component: RecipeAddFormComponent },
    {path: 'search-recipe', component: RecipelistComponent},
];
