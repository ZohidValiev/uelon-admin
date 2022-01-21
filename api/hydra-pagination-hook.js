
export function useSWRHydraPaginationWrapper(useSWRHook) {
    let _items = null
    let _totalItems = null

    return (...args) => {
        const result = useSWRHook(...args)
        const isLoading = !result.data && !result.error
        _totalItems = getTotalItems(result.data) ?? _totalItems
        _items = getItems(result.data) ?? _items

        return {
            ...result,
            isLoading,
            items: _items,
            totalItems: _totalItems,
        }
    }
}

function getItems(data) {
    return data && data["hydra:member"]
}

function getTotalItems(data) {
    return data && data["hydra:totalItems"]
}