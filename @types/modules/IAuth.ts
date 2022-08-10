import { IUser } from "@/types/entities/IUser"

export interface ILoginForm {
    email: string
    password: string
}

export interface ILoginResponse {
    user: IUser
    token: string
}
