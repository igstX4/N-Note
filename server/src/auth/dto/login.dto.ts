import { IsEmail, IsString } from "class-validator"
export class loginDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password : string
}