
import { instance } from "./axios"
import { Auth } from "@/types/users"


export async function login(email: string, password: string): Promise<Auth.Data> {
    return (await instance.post<Auth.Data>("/login_check", {
        email,
        password,
    })).data
}

export async function refreshAccessToken(refreshToken: string): Promise<Auth.Data> {
    return (await instance.post<Auth.Data>("/token/refresh", {
        refreshToken
    })).data
}
