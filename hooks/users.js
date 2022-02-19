
import { mLaggyHydra } from "./middlewares"
import { instance } from "@/api/axios"
import useSWR from "swr"

const fetcher = async (url) => {
    const response = await instance.get(url)
    return response.data
}

export const useUser = (id, config) => {
    const result = useSWR(`/users/${id}`, fetcher, config)

    return {
        ...result,
        isLoading: !result.data && !result.error,
    }
}

export const useUsers = (page, config = {}) => {
    return useSWR(`/users?page=${page}&_order[id]=desc`, fetcher, {
        use: [ mLaggyHydra ],
        ...config,
    })
}
