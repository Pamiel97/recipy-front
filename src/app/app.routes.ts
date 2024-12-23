import { Routes } from '@angular/router';
import { RecipeAddFormComponent } from './recipes/recipe-add-form/recipe-add-form.component';
import { RecipelistComponent } from './recipes/recipelist/recipelist.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'create-recipe', component: RecipeAddFormComponent },
    {path: 'search-recipe', component: RecipelistComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent}
    
];
