import { RecipeDto } from "../recipes/recipe-dto";

export interface ReviewDto {
    id?: number; // Opzionale, solo per recensioni già salvate
    text: string;
    rating: number;
    creationDate: string;
    recipe: number; // Oggetto per la ricetta
  }
  