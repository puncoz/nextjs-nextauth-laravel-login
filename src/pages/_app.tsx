import { AppConfig } from "@/config/app.config"
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import "../assets/css/styles.scss"
import "../assets/css/tailwind.css"

const MainApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
    return (
        <SessionProvider session={session}>
            <Head>
                <title>{AppConfig.title}</title>

                <meta name="viewport"
                      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
            </Head>

            <Component {...pageProps} />
        </SessionProvider>
    )
}

export default MainApp
