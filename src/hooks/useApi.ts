import { AppConfig } from "@/config/app.config"
import useCache from "@/hooks/useCache"
import { IApiOptions, IApiResponse } from "@/types/IApi"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import qs from "qs"
import { useCallback, useMemo } from "react"

export const Http = axios.create({
    baseURL: AppConfig.apiUrl,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
})

const useApi = () => {
    const cache = useCache()
    const defaultOptions = useMemo<IApiOptions>(() => ({
        cacheEnabled: true,
        processParams: false,
    }), [])

    const get = useCallback(async <T>(
        endpoint: string,
        params?: AxiosRequestConfig["params"],
        options: IApiOptions = {},
    ): Promise<IApiResponse<T>> => {
        const { cacheEnabled } = { ...defaultOptions, ...options }

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            params,
        }

        try {
            const key = _cacheKey(endpoint, params)

            let res = {} as AxiosResponse

            if (cacheEnabled && cache.has(key)) {
                res = cache.get(key)
            } else {
                res = await Http.get<T>(endpoint, config)

                if (cacheEnabled) {
                    cache.set(key, res)
                }
            }

            return _success(res)
        } catch (e) {
            return _error(e as AxiosError)
        }
    }, [cache, defaultOptions])

    const post = useCallback(async <R, T>(
        endpoint: string,
        params: R = {} as R,
        options: IApiOptions = defaultOptions,
    ): Promise<IApiResponse<T>> => {
        const { contentType, processParams } = { ...defaultOptions, ...options }

        const config = {
            headers: {
                "Content-Type": contentType || "application/json",
            },
        }

        try {
            const response = await Http.post<T>(endpoint, processParams ? qs.stringify(params) : params, config)

            return _success(response)
        } catch (e) {
            return _error(e as AxiosError)
        }
    }, [defaultOptions])

    const put = useCallback(async <R, T>(
        endpoint: string,
        params: R = {} as R,
    ): Promise<IApiResponse<T>> => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        try {
            const response = await Http.put<T>(endpoint, params, config)

            return _success(response)
        } catch (e) {
            return _error(e as AxiosError)
        }
    }, [])

    const patch = useCallback(async <R, T>(
        endpoint: string,
        params: R = {} as R,
    ): Promise<IApiResponse<T>> => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        try {
            const response = await Http.patch<T>(endpoint, params, config)

            return _success(response)
        } catch (e) {
            return _error(e as AxiosError)
        }
    }, [])

    const destroy = useCallback(async <T>(endpoint: string): Promise<IApiResponse<T>> => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        try {
            const response = await Http.delete<T>(endpoint)

            return _success(response)
        } catch (e) {
            return _error(e as AxiosError)
        }
    }, [])

    const invalidate = useCallback(async (endpoint: string, params?: AxiosRequestConfig["params"]): Promise<void> => {
        const key = _cacheKey(endpoint, params)

        cache.delete(key)
    }, [cache])

    const invalidateAll = useCallback(() => {
        cache.clear()
    }, [cache])

    const _success = <T>(res: AxiosResponse<T>): IApiResponse<T> => {
        return {
            body: res.data,
            status: res.status,
            headers: res.headers,
        }
    }

    const _error = (error: Error | AxiosError) => {
        throw error
    }

    const _cacheKey = (endpoint: string, params?: AxiosRequestConfig["params"]) => {
        return encodeURIComponent(endpoint + JSON.stringify(params))
    }

    return { get, post, put, patch, delete: destroy, invalidate, invalidateAll }
}

export default useApi
