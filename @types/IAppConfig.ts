export type ILocales = "en"

export interface IAppConfig {
    title: string
    url: string
    description: string
    keywords: string[]
    previewImage: string

    locale: ILocales
}
