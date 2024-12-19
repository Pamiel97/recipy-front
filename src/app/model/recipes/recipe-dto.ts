import { RecipeStepDto } from "../recipe-steps/recipe-step-dto";
import { UserDto } from "../users/user-dto";
import { Difficulty } from "./difficulty.enum";

export interface RecipeDto {
    id: number;
    title: string;
    description: string;
    course: string;
    prepTime: number;
    cookingTime: number;
    difficulty: Difficulty;
    kCalories: number;
    creationDate: string;
    imgUrl: string;
    user: UserDto;
    tags: string[];
    recipeSteps: RecipeStepDto[];
}