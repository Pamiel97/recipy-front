import { Role } from "./role.enum";

export interface RegisterDto{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
}