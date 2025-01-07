import { Routes } from '@angular/router';
import { RecipeAddFormComponent } from './recipes/recipe-add-form/recipe-add-form.component';
import { RecipelistComponent } from './recipes/recipelist/recipelist.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './users/profile/profile.component';
import { UserRecipesComponent } from './users/user-recipes/user-recipes.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { UserPantriesComponent } from './users/user-pantries/user-pantries.component';
import { PantryAddFormComponent } from './pantries/pantry-add-form/pantry-add-form.component';
import { EditPantryComponent } from './pantries/edit-pantry/edit-pantry.component';
import { PantriesListComponent } from './pantries/pantries-list/pantries-list.component';

export const routes: Routes = [
    {path: 'create-recipe', component: RecipeAddFormComponent },
    {path: 'search-recipe', component: RecipelistComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'user-recipes', component: UserRecipesComponent},
    {path: 'edit-recipe/:id', component: EditRecipeComponent},
    {path: 'recipe-detail/:id', component: RecipeDetailComponent},

    {path: 'user-pantries', component: UserPantriesComponent},
    {path: 'create-pantry', component: PantryAddFormComponent},
    {path: 'edit-pantry/:id', component: EditPantryComponent},
    {path: 'pantries-list', component: PantriesListComponent},
    
];
