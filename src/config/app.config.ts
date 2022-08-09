import { IAppConfig } from "@/types/IAppConfig"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"

export const AppConfig: IAppConfig = {
    title: "EverSpeaker",
    url: siteUrl,
    description: "EverSpeaker is a marketplace for speakers.",
    keywords: ["speakers", "marketplace", "web", "application"],
    previewImage: `${siteUrl}/static/img/preview.png`,

    locale: "en",
}
