import { AppConfig } from "@/config/app.config"
import type { AppProps } from "next/app"
import Head from "next/head"
import "../assets/css/styles.scss"

const MainApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>{AppConfig.title}</title>

                <meta name="viewport"
                      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
            </Head>

            <Component {...pageProps} />
        </>
    )
}

export default MainApp
