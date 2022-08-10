import { LoginFormData } from "@/formdata/LoginFormData"
import { siteUrl } from "@/utils/helpers"
import { signIn } from "next-auth/react"
import { useCallback, useState } from "react"

const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const login = useCallback(async (credentials: LoginFormData) => {
        setLoading(true)

        await signIn("credentials", {
            email: credentials.email,
            password: credentials.password,
            callbackUrl: siteUrl(),
        })
    }, [])

    return {
        loading,
        login,
    }
}

export default useAuth
