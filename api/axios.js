
import axios from "axios"


const baseUrl = "http://127.0.0.1:8000"

export function get(url, config) {
    return axios.get(`${baseUrl}${url}`, { withCredentials: true, ...config})
}

export function post(url, data, config) {
    return axios.post(`${baseUrl}${url}`, data, { withCredentials: true, ...config})
}

export function put(url, data, config) {
    return axios.put(`${baseUrl}${url}`, data, { withCredentials: true, ...config})
}

export function patch(url, data, config) {
    return axios.patch(`${baseUrl}${url}`, data, { 
        withCredentials: true, 
        headers: {
            "Content-Type": "application/merge-patch+json",
        },
        ...config,
    })
}

export function remove(url, config) {
    return axios.delete(`${baseUrl}${url}`, { withCredentials: true, ...config })
}