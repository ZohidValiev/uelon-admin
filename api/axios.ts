
import axios, { AxiosRequestConfig } from "axios"

export const instance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
})


const baseUrl = "http://127.0.0.1:8000"

export function get(url: string, config?: AxiosRequestConfig<any>) {
    return axios.get(`${baseUrl}${url}`, { withCredentials: true, ...(config ?? {}) })
}

export function post(url: string, data?:any, config?: AxiosRequestConfig<any>) {
    return axios.post(`${baseUrl}${url}`, data, { withCredentials: true, ...(config ?? {}) })
}

export function put(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    return axios.put(`${baseUrl}${url}`, data, { withCredentials: true, ...(config ?? {})})
}

export function patch(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    return axios.patch(`${baseUrl}${url}`, data, { 
        withCredentials: true, 
        headers: {
            "Content-Type": "application/merge-patch+json",
        },
        ...(config ?? {})
    })
}

export function remove(url: string, config?: AxiosRequestConfig<any>) {
    return axios.delete(`${baseUrl}${url}`, { withCredentials: true, ...(config ?? {}) })
}