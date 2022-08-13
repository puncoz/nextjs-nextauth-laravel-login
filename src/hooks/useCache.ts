import CacheManager from "@/utils/CacheManager"
import { useMemo } from "react"

const useCache = () => {
    const cache = useMemo(() => new CacheManager(), [])

    return { ...cache }
}

export default useCache
