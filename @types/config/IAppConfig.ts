export type ILocales = "en"

export interface IAppConfig {
    title: string
    description: string
    keywords: string[]
    previewImage: string

    locale: ILocales

    baseUrl: string
    apiUrl: string
    isSecure: boolean
}
