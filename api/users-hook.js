
import { useSWRHydraPaginationWrapper } from "./hydra-pagination-hook"
import { get } from "./axios"
import useSWR from "swr"

const fetcher = async (url) => {
    return (await get(url)).data;
}

export const useUser = (id, options) => {
    const result = useSWR(`/api/users/${id}`, options)

    return {
        ...result,
        isLoading: !result.data && !result.error,
    }
}

export const useUsers = (page, options) => {
    return _useUsers(page, options)
}

const _useUsers = useSWRHydraPaginationWrapper((page, options) => {
    return useSWR(`/api/users?page=${page}&_order[id]=desc`, fetcher, options)
})

// const getKey = (page, prevPageData) => {
//     console.log("getKey:page: ", page)
    
//     if (prevPageData && prevPageData.length === 0) {
//         return null
//     }

//     return `/api/users?page=${page + 1}&_order[id]=desc`
//     // return [`/api/users?page=${page + 1}&_order[id]=desc`, page + 1]
// }

// export const useUsersInfinite = (options) => {
//     const {data, error, isValidating, mutate, size, setSize} = useSWRInfinite(getKey, fetcher, options)

//     const pagination = {
//         getTotalItems() {
//             return data["hydra:totalItems"]
//         }
//     }

//     return {
//         data,
//         get items() {
//             return data && (data[size-1] ? data[size-1]["hydra:member"] : data[size-2]["hydra:member"])
//             // return data && data[size-1] && data[size-1]["hydra:member"]
//         },
//         error,
//         isLoading: !error && (!data || !data[size-1]),
//         isValidating,
//         mutate,
//         size,
//         setSize,
//         pagination,
//     }
// }