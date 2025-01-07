import { AllergyDto } from "../allergies/allergy-dto";
import { IntoleranceDto } from "../intolerances/intolerance-dto";

export interface UserDetailDto {
    profile: string;
    pal: string;
    imgUrl: string;
    role: string;
    weight: number;
    height: number;
    bfp: number;
    lbmp: number;
    sex: string;
    eatingRegimeId: number;
}