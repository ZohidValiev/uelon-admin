
import { mLaggyHydra } from "./middlewares"
import { get } from "@/api/axios"
import useSWR from "swr"

const fetcher = async (url) => {
    const response = await get(url)
    return response.data
}

export const useUser = (id, config) => {
    const result = useSWR(`/api/users/${id}`, fetcher, config)

    return {
        ...result,
        isLoading: !result.data && !result.error,
    }
}

export const useUsers = (page, config = {}) => {
    return useSWR(`/api/users?page=${page}&_order[id]=desc`, fetcher, {
        ...config,
        use: [ mLaggyHydra ],
    })
}
