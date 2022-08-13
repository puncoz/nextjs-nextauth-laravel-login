import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginFormData {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}
