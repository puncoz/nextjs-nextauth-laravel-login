import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import Link from "next/link"

const Home: NextPage = () => {
    const { data: session } = useSession()

    console.log(session)

    return (
        <main>
            <Link href={`/login`}>
                Login
            </Link>
        </main>
    )
}

export default Home
