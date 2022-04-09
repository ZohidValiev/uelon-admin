
import { mLaggyHydra, mWithLoading } from "./middlewares"
import { instance } from "@/api/axios"
import useSWR, { SWRConfiguration } from "swr"
import { Entity } from "@/types/users"
import { SWRPaginationResponse, SWRResponse } from "@/types/swr"


const fetcher = async (url: string) => {
    return (await instance.get(url)).data
}

export const useUser = (id: number, config: SWRConfiguration<Entity.User> = {}) => {
    const key = `/users/${id}`
    const result = useSWR<Entity.User>(key, fetcher, {
        use: [
            mWithLoading,
        ],
        ...config,
    })

    return result as SWRResponse<Entity.User>
}

export const useUsers = (page: number, config: SWRConfiguration<Entity.User> = {}) => {
    const key = `/users?page=${page}`
    const result = useSWR(key, fetcher, {
        use: [ mLaggyHydra ],
        ...config,
    })

    return result as SWRPaginationResponse<Entity.User>
}
