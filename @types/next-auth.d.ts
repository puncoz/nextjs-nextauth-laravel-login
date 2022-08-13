import { IUser } from "@/types/entities/IUser"
import { ILoginResponse } from "@/types/modules/IAuth"

declare module "next-auth" {
    /** extending the built-in session types  */
    interface Session {
        accessToken?: string
        user?: IUser
    }

    interface User extends ILoginResponse {

    }
}

/** extending the built-in jwt types  */
declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string
        user?: IUser
    }
}
