
import * as swr from "swr"


export interface SWRResponse<Data = any> extends swr.SWRResponse<Data> {
    isLoading: boolean
}

enum HydraFields {
    MEMBER = "hydra:member",
    TOTAL_ITEMS = "hydra:totalItems"
}

export interface SWRHydraData<Data> {
    [HydraFields.MEMBER]: Data[]
    [HydraFields.TOTAL_ITEMS]: number
}

export interface SWRPaginationResponse<Data = {}> extends Omit<SWRResponse<Data>, "data"> {
    isLagging: boolean
    items: Data[] | undefined
    totalItems: number | undefined
}

