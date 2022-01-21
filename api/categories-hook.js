
import useSWR from "swr"
import { get } from "./axios"


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

export function useCategoriesLevel1(options) {
    return useSWR("/api/categories", fetcher, options)
}

export function useCategoriesLevel2(parentId, options) {
    return useSWR(`/api/categories/${parentId}/children`, fetcher, options)
}

export function useCategoriesLevel3(parentId, options) {
    return useCategoriesLevel2(parentId, options)
}