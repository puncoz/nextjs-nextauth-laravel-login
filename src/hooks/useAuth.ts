import { LoginFormData } from "@/formdata/LoginFormData"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

const useAuth = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const login = useCallback(async (credentials: LoginFormData, onError: Function) => {
        setLoading(true)

        const res = await signIn("credentials", {
            email: credentials.email,
            password: credentials.password,
            redirect: false,
        })

        if (res?.ok) {
            await router.push("/")
        }

        setLoading(false)
        onError(res?.error)
    }, [router])

    return {
        loading,
        login,
    }
}

export default useAuth
