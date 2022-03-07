
import useSWR, { SWRConfiguration } from "swr"
import { instance } from "@/api/axios"
import { Entity } from "@/types/categories"
import { SWRResponse } from "@/types/swr"
import { mWithLoading } from "./middlewares"


const fetcher = async (url: string) => {
    return (await instance.get(url, {
        headers: {
            accept: "application/json"
        }
    })).data
}

export function useCategory(id: number, config: SWRConfiguration<Entity.Category> = {}): SWRResponse<Entity.Category> {
    const key = `/categories/${id}`
    const result = useSWR<Entity.Category>(key, fetcher, {
        use: [
            mWithLoading,
        ],
        ...config,
    })

    return result as SWRResponse<Entity.Category>
}

export function useCategoriesLevel1(config: SWRConfiguration<Entity.Category> = {}): SWRResponse<Entity.Category[]> {
    const key = "/categories"
    const result = useSWR(key, fetcher, {
        use: [
            mWithLoading,
        ],
        revalidateIfStale: false,
        revalidateOnFocus: false,
        ...config,
    })

    return result as SWRResponse<Entity.Category[]>
}

export function useCategoriesLevel2(parentId: number,  config: SWRConfiguration<Entity.Category[]> = {}) : SWRResponse<Entity.Category[]> {
    const key = `/categories/${parentId}/children`
    const result = useSWR(key, fetcher, {
        use: [
            mWithLoading,
        ],
        revalidateIfStale: false,
        revalidateOnFocus: false,
        ...config,
    })
    
    return result as SWRResponse<Entity.Category[]>
}

export function useCategoriesLevel3(parentId: number, config: SWRConfiguration<Entity.Category[]> = {}) {
    return useCategoriesLevel2(parentId, config)
}