import { AppConfig } from "@/config/app.config"

export const removeTrailingSlashes = (str: string): string => str.replace(/^\/|\/$/g, "")

export const siteUrl = (path?: string, withProtocol = true): string => {
    const protocol = withProtocol ? `http${AppConfig.isSecure ? "s" : ""}://` : ""
    const base = removeTrailingSlashes(AppConfig.baseUrl)
    const endpoint = path ? removeTrailingSlashes(path) : ""

    return `${protocol}${base}/${endpoint}`
}
