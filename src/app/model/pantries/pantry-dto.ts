import { UserDto } from "../users/user-dto";

export interface PantryDto{
    id: number;
    quantity: number;
    unitType: string;
    purchaseDate: string;
    expirationDate: string;
    user: UserDto;
    ingredientId: number;
    ingredientName: string;
}