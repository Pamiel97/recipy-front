import { RecipeDto } from "../recipes/recipe-dto";
import { UserDto } from "../users/user-dto";

export interface ReviewDto {
    text: string;
    rating: number;
    creationDate: string;
    userDto: UserDto;
    recipe: RecipeDto;
}