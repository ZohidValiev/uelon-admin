
export function useSWRHydraPaginationWrapper(useSWRHook) {
    let _items = null
    let _totalItems = null

    return (...args) => {
        console.log("before:useSWRHook")
        const result = useSWRHook(...args)
        console.log("after:useSWRHook")
        console.log("result: ", result)

        _isLoading  = !result.data && !result.error
        _items      = (result.data && result.data["hydra:memeber"]) || _items
        _totalItems = (result.data && result.data["hydra:totalItems"]) || _items

        return {
            ...result,
            isLoading: _isLoading,
            items: _items,
            totalItems: _totalItems,
        }
    }
}