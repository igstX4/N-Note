import { IsEmail, IsString, Length } from "class-validator"

export class createUserDto {
    @IsString()
    @Length(3, 35)
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @Length(5, 21)
    readonly password: string;
}