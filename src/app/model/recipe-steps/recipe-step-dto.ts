export interface RecipeStepDto {
    id: number;
    description: string;
    ordinal: number;
    stepImgUrl: string;
    ingredientId: number;
    recipeId: number;
}