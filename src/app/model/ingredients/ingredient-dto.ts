export interface IngredientDto{
    id: number;
    name: string;
    kcal: number;
    carbs: number;
    prots: number;
    fats: number;
    ingredientCategory: string;
    weight: number;
    price: number;
    imgUrl: string;
    allergy: string;
    intolerance: string;
}