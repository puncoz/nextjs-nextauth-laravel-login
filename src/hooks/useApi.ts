import Api from "@/utils/Api"
import { useMemo } from "react"

const useApi = (token?: string) => {
    const api = useMemo(() => new Api(token), [token])

    return { ...api }
}

export default useApi
