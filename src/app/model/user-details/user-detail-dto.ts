import { AllergyDto } from "../allergies/allergy-dto";
import { IntoleranceDto } from "../intolerances/intolerance-dto";

export interface UserDetailDto {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    profile: string;
    dietType: string;
    pal: string;
    imgUrl: string;
    role: string;
    weight: number;
    height: number;
    bfp: number;
    lbmp: number;
    sex: string;  
    allergies: AllergyDto[];
    intolerances: IntoleranceDto[];
}