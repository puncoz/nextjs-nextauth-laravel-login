import { IUser } from "@/types/entities/IUser"

export interface ILoginResponse {
    user: IUser
    token: string
}
