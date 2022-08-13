import { AppConfig } from "@/config/app.config"
import { IApiOptions, IApiResponse, IResponse } from "@/types/utils/IApi"
import CacheManager from "@/utils/CacheManager"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import qs from "qs"

export const Http = axios.create({
    baseURL: AppConfig.apiUrl,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})

class Api {
    token?: string
    cache: CacheManager = new CacheManager()

    defaultOptions: IApiOptions = {
        cacheEnabled: true,
        processParams: false,
    }

    constructor(token?: string) {
        this.token = token

        this.tokenInterceptor()
    }

    async get<T>(
        endpoint: string,
        params?: AxiosRequestConfig["params"],
        options: IApiOptions = {},
    ): Promise<IApiResponse<T>> {
        const { cacheEnabled } = { ...this.defaultOptions, ...options }

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            params,
        }

        try {
            const key = this.cacheKey(endpoint, params)

            let res = {} as AxiosResponse

            if (cacheEnabled && this.cache.has(key)) {
                res = this.cache.get(key)
            } else {
                res = await Http.get<T>(endpoint, config)

                if (cacheEnabled) {
                    this.cache.set(key, res)
                }
            }

            return this.success(res)
        } catch (e) {
            return this.error(e as AxiosError)
        }
    }

    async post<R, T>(
        endpoint: string,
        params: R = {} as R,
        options: IApiOptions = {},
    ): Promise<IApiResponse<T>> {
        const { contentType, processParams } = { ...this.defaultOptions, ...options }

        const config = {
            headers: {
                "Content-Type": contentType || "application/json",
            },
        }

        try {
            const response = await Http.post<T>(endpoint, processParams ? qs.stringify(params) : params, config)

            return this.success(response)
        } catch (e) {
            return this.error(e as AxiosError)
        }
    }

    async put<R, T>(endpoint: string, params: R = {} as R): Promise<IApiResponse<T>> {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        try {
            const response = await Http.put<T>(endpoint, params, config)

            return this.success(response)
        } catch (e) {
            return this.error(e as AxiosError)
        }
    }

    async patch<R, T>(endpoint: string, params: R = {} as R): Promise<IApiResponse<T>> {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        try {
            const response = await Http.patch<T>(endpoint, params, config)

            return this.success(response)
        } catch (e) {
            return this.error(e as AxiosError)
        }
    }

    async delete<T>(endpoint: string): Promise<IApiResponse<T>> {
        try {
            const response = await Http.delete<T>(endpoint)

            return this.success(response)
        } catch (e) {
            return this.error(e as AxiosError)
        }
    }

    async invalidate(endpoint: string, params?: AxiosRequestConfig["params"]): Promise<void> {
        const key = this.cacheKey(endpoint, params)

        this.cache.delete(key)
    }

    invalidateAll() {
        this.cache.clear()
    }

    private success<T>(res: AxiosResponse<T>): Promise<IApiResponse<T>> {
        return Promise.resolve({
            body: res.data as unknown as IResponse<T>,
            status: res.status,
            headers: res.headers,
        })
    }

    private error(error: Error | AxiosError) {
        return Promise.reject(error)
    }

    private cacheKey(endpoint: string, params?: AxiosRequestConfig["params"]): string {
        return encodeURIComponent(endpoint + JSON.stringify(params))
    }

    private tokenInterceptor() {
        Http.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                if (this.token) {
                    Http.defaults.headers.common["Authorization"] = `Bearer ${this.token}`

                    if (config.headers) {
                        config.headers["Authorization"] = `Bearer ${this.token}`
                    }
                }

                return config
            },
            (error: AxiosError) => Promise.reject(error),
        )
    }
}

export default Api
