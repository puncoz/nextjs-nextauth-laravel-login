import { AppConfig } from "@/config/app.config"
import { LoginFormData } from "@/formdata/LoginFormData"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback, useMemo, useState } from "react"

const useAuth = (token?: string) => {
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const { data: session, status } = useSession()

    const isAuthenticated = useMemo(() => status === "authenticated", [status])

    const login = useCallback(async (credentials: LoginFormData, onError: Function) => {
        setLoading(true)

        const res = await signIn("credentials", {
            email: credentials.email,
            password: credentials.password,
            redirect: false,
        })

        if (res?.ok) {
            await router.push(AppConfig.authenticatedRoute)
        }

        setLoading(false)
        onError(res?.error)
    }, [router])

    const logout = useCallback(async () => {
        await signOut({ callbackUrl: AppConfig.unAuthenticatedRoute })
    }, [])

    return {
        loading: loading || status === "loading",
        isAuthenticated,
        login,
        logout,
    }
}

export default useAuth
