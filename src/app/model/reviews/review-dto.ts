import { RecipeDto } from "../recipes/recipe-dto";
import { UserDto } from "../users/user-dto";

export interface ReviewDto {
    id?: number; // Opzionale, solo per recensioni già salvate
    text: string;
    rating: number;
    creationDate: string;
    recipeDto: RecipeDto; 
    userDto: UserDto;
  }
  