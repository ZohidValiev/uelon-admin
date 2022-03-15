
import { signOut } from "next-auth/react"
import { tokenStore } from "@/types/token"
import axios, { AxiosInstance, AxiosRequestHeaders, AxiosRequestConfig, AxiosResponse } from "axios"

function create(): AxiosInstance {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    
    return axios.create({
        baseURL: baseUrl,
        withCredentials: true,
    })
}


export const instance = create()

instance.interceptors.request.use(
    (config) => {
        if (tokenStore.hasAccessToken()) {
            config.headers["Authorization"] = `Bearer ${tokenStore.getAccessToken()}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (response) => {
        return response
    }, 
    async (error) => {
        const config = error.config

        if (error.response) {
            const response = error.response
            if (response.status === 401 && !config._retry) {
                config._retry = true
                try {
                    const result = await refreshAccessToken()    
                    if (result.signOut) {
                        signOut()
                        return 
                    }
                    tokenStore.setToken(result.accessToken, result.refreshToken)
                    return instance(config)
                } catch (_error) {
                    console.error(_error)
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data)
                    } else {
                        return Promise.reject(_error)
                    }
                }
            }
            if (error.response.status === 403 && error.response.data) {
                return Promise.reject(error.response.data);
            }
        }

        return Promise.reject(error);
    }
)

async function refreshAccessToken() {
    const url = process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/auth/session"
    return (await axios.get(url, {
        params: {
            "refresh-token": 1,
        }
    })).data
}

export function patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return instance.patch<T, R, D>(url, data, {
        headers: {
            "Content-Type": "application/merge-patch+json"
        },
        ...(config ?? {})
    })
}

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
