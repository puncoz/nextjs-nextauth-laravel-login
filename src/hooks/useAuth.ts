import useApi from "@/hooks/useApi"
import { ILoginForm } from "@/types/modules/IAuth"
import { siteUrl } from "@/utils/helpers"
import { AxiosError } from "axios"
import { signIn } from "next-auth/react"
import { useCallback, useState } from "react"

const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const api = useApi()

    const login = useCallback(async (credentials: ILoginForm, onError?: (msg: string) => void) => {
        setLoading(true)

        try {
            await signIn("credentials", {
                email: credentials.email,
                password: credentials.password,
                callbackUrl: siteUrl(),
            })
            // const { body: { payload: user } } = await api.post<ILoginForm, ILoginResponse>("/login", credentials)


        } catch (e) {
            setLoading(false)

            if (!(e instanceof AxiosError) || !e.response) {
                throw e
            }

            if (onError) {
                onError(e.response.data.message)
            }
        }
    }, [api])

    return {
        loading,
        login,
    }
}

export default useAuth
