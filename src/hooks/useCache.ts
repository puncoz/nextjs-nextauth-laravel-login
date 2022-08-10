const useCache = () => {
    const cache = new Map()

    return {
        has: (key: string): boolean => cache.has(key),

        get: <T>(key: string): T => cache.get(key),

        set: <T>(key: string, value: T): void => {
            cache.set(key, value)
        },

        delete: (key: string) => {
            cache.delete(key)
        },

        clear: (): void => {
            cache.clear()
        },
    }
}

export default useCache
