import NextAuth, { CallbacksOptions, NextAuthOptions } from "next-auth"
import { Provider } from "next-auth/providers"
import CredentialsProvider from "next-auth/providers/credentials"

const providers: Provider[] = [
    CredentialsProvider({
        credentials: {
            email: {},
            password: {},
        },
        authorize: async (credentials) => {
            console.log(credentials, "credentials")
            const loginUrl = `${process.env.NEXT_PUBLIC_API_URL}/login`
            const res = await fetch(loginUrl, {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const user = await res.json()

            if (res.ok && user) {
                return user.payload
            }

            return null
        },
    }),
]

const callbacks: Partial<CallbacksOptions> = {
    jwt: async ({ token, account, user }) => {
        // Persist the OAuth access_token to the token right after signin
        if (user) {
            token.user = user.user
            token.accessToken = user.token
        }

        return token
    },

    session: async ({ session, token, user }) => {
        // Send properties to the client, like an access_token from a provider.
        console.log(token, user, "token session")
        session.accessToken = token.accessToken
        session.user = token.user

        return session
    },
}

const options: NextAuthOptions = {
    providers,
    callbacks,

    pages: {
        signIn: "/login",
        error: "/login",
    },
}

export default NextAuth(options)
