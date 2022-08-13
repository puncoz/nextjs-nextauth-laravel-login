import { IAppConfig } from "@/types/config/IAppConfig"

export const AppConfig: IAppConfig = {
    title: "EverSpeaker",
    description: "EverSpeaker is a marketplace for speakers.",
    keywords: ["speakers", "marketplace", "web", "application"],
    previewImage: `/static/img/preview.png`,

    locale: "en",

    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000",
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    isSecure: Boolean((process.env.NEXT_PUBLIC_SECURE || "true") === "true"),

    authenticatedRoute: "/profile",
    unAuthenticatedRoute: "/login",
}
