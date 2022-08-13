import { AxiosResponse } from "axios"

export interface IApiOptions {
    cacheEnabled?: boolean
    processParams?: boolean
    contentType?: string
}

export interface IPagination {
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
    links: {
        previous?: string
        next?: string
    }
}

export interface IResponse<T> {
    success: boolean,
    message?: string
    payload?: T,
    metadata?: {
        pagination: IPagination
    }
}

export interface IApiResponse<T> {
    body: IResponse<T>,
    status: number,
    headers: AxiosResponse["headers"],
}
