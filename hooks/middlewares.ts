
import { SWRHydraData } from "@/types/swr"
import { Entity } from "@/types/users"
import { useEffect, useRef } from "react"
import { SWRHook } from "swr"


export const mWithLoading = (useSWRNext: SWRHook) => {
    return (key, fetcher, config): any => {
        const swr = useSWRNext(key, fetcher, config)
        const isLoading: boolean = !swr.data && !swr.error

        return {
            ...swr,
            isLoading,
        }
    }
}

export const mLaggyHydra = (useSWRNext: SWRHook) => {
    return (key, fetcher, config): any => {
        const prevDataRef = useRef<SWRHydraData<Entity.User>>()        
        const swr = useSWRNext<SWRHydraData<Entity.User>>(key, fetcher, config)

        useEffect(() => {
            if (swr.data !== undefined) {
                prevDataRef.current = swr.data
            }
        }, [swr.data])

        const isLoading: boolean = !swr.data && !swr.error
        const isLagging: boolean = swr.data === undefined && prevDataRef.current !== undefined 
        const dataOrLaggyData = swr.data ?? prevDataRef.current
        const items: Entity.User[] | undefined = dataOrLaggyData ? dataOrLaggyData["hydra:member"] : undefined
        const totalItems: number | undefined = dataOrLaggyData ? dataOrLaggyData["hydra:totalItems"] : undefined

        return {
            ...swr,
            isLoading, 
            isLagging,
            items,
            totalItems,
        }
    }
}