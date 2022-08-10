import { LoginFormData } from "@/formdata/LoginFormData"
import Api from "@/utils/Api"
import NextAuth, { CallbacksOptions, NextAuthOptions, User } from "next-auth"
import { Provider } from "next-auth/providers"
import CredentialsProvider from "next-auth/providers/credentials"

const providers: Provider[] = [
    CredentialsProvider({
        credentials: {
            email: {},
            password: {},
        },

        authorize: async (credentials) => {
            const api = new Api()

            try {
                const { body: { payload: user } } = await api.post<LoginFormData, User>("/login", credentials)

                if (!user) {
                    return null
                }

                return user
            } catch (e) {
                return null
            }
        },
    }),
]

const callbacks: Partial<CallbacksOptions> = {
    jwt: async ({ token, account, user }) => {
        // Persist the access_token and user to the token right after signin
        if (user) {
            token.user = user.user
            token.accessToken = user.token
        }

        return token
    },

    session: async ({ session, token, user }) => {
        // Send properties to the client, like an access_token from a provider.
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
