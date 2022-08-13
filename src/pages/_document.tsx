import { AppConfig } from "@/config/app.config"
import { siteUrl } from "@/utils/helpers"
import { Head, Html, Main, NextScript } from "next/document"

const MainDocument = () => {
    return (
        <Html lang={AppConfig.locale}>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="title" content={AppConfig.title}/>

                <link rel="icon" href="/favicon.ico"/>

                <meta name="description" content={AppConfig.description}/>
                <meta name="keywords" content={AppConfig.keywords.join(",")}/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content={siteUrl()}/>
                <meta property="og:title" content={AppConfig.title}/>
                <meta property="og:description" content={AppConfig.description}/>
                <meta property="og:image" content={siteUrl(AppConfig.previewImage)}/>

                <meta property="twitter:card" content={AppConfig.previewImage}/>
                <meta property="twitter:url" content={siteUrl()}/>
                <meta property="twitter:title" content={AppConfig.title}/>
                <meta property="twitter:description" content={AppConfig.description}/>
                <meta property="twitter:image" content={siteUrl(AppConfig.previewImage)}/>
            </Head>

            <body className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}

export default MainDocument
