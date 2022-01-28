
import useSWR from "swr"
import { get } from "@/api/axios"


const fetcher = async (url) => {
    const response = await get(url, {
        headers: {
            accept: "application/json"
        }
    })
    return response.data
}

export function useCategory(id) {
    return useSWR(`/api/categories/${id}`)
}

export function useCategoriesLevel1(config) {
    return useSWR("/api/categories", fetcher, {
        ...config,
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })
}

export function useCategoriesLevel2(parentId, config) {
    return useSWR(`/api/categories/${parentId}/children`, fetcher, {
        ...config,
        revalidateIfStale: false,
        revalidateOnFocus: false,
    })
}

export function useCategoriesLevel3(parentId, config) {
    return useCategoriesLevel2(parentId, config)
}