
import { useEffect, useRef } from "react"


export const mLaggyHydra = (useSWRNext) => {
    return (key, fetcher, config) => {
        const prevDataRef = useRef()        
        const swr = useSWRNext(key, fetcher, config)

        useEffect(() => {
            if (swr.data !== undefined) {
                prevDataRef.current = swr.data
            }
        }, [swr.data])

        const isLoading = !swr.data && !swr.error
        const isLagging = swr.data === undefined && prevDataRef.current !== undefined 
        const dataOrLaggyData = swr.data ?? prevDataRef.current
        const items = dataOrLaggyData ? dataOrLaggyData["hydra:member"] : undefined
        const totalItems = dataOrLaggyData ? dataOrLaggyData["hydra:totalItems"] : undefined

        return {
            ...swr,
            isLoading, 
            isLagging,
            items,
            totalItems,
        }
    }
}