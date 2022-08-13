import useAuth from "@/hooks/useAuth"
import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import Link from "next/link"

const Home: NextPage = () => {
    const { data: session, status } = useSession()

    const { isAuthenticated } = useAuth(session?.accessToken)

    return (
        <main className="flex justify-center items-center h-screen">
            {status === "loading" && (
                <p>Loading...</p>
            )}

            {isAuthenticated ? (
                <Link href={`/profile`}>
                    <a className="text-2xl">Profile</a>
                </Link>
            ) : (
                <Link href={`/login`}>
                    <a className="text-2xl">Login</a>
                </Link>
            )}
        </main>
    )
}

export default Home
