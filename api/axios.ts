
import { tokenStore } from "@/types/token"
import axios, { AxiosInstance, AxiosRequestHeaders, AxiosError } from "axios"

function create(): AxiosInstance {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const headers: AxiosRequestHeaders = {}

    if (tokenStore.hasAccessToken()) {
        headers["Authorization"] = `Bearer ${tokenStore.getAccessToken()}`
    }

    return axios.create({
        baseURL: baseUrl,
        withCredentials: true,
        headers,
    })
}


export const instance = create()

export function axiosHttpCode422Thrower(error: any, otherErrorCallback?: (error: any) => void) {
    if (axios.isAxiosError(error)) {
        if (error.code === "422") {
            throw error
        }
    }

    if (otherErrorCallback) {
        otherErrorCallback(error)
    }
}
