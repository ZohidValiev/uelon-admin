
import { instance }  from "./axios"
import { Action } from "../types/users"

export async function loadUsers() {
    return instance.get("/users?_order[id]=desc")
}

export async function loadUser(id: number) {
    return instance.get(`/users/${id}`)
}

export async function login(email: string, password: string) {
    return instance.post("/login_check", {
        email,
        password,
    })
}

export async function createUser(data: Action.CreateUserData) {
    return instance.post(`/users`, data)
}

export async function updateUserNickname(id: number, nickname: string) {
    return instance.patch(`/users/${id}/nickname`, {
        value: nickname,
    })
}

export async function updateUserStatus(id :number, status: number) {
    return instance.patch(`/users/${id}/status`, {
        value: status,
    })
}

export async function updateUserRole(id: number, role: string) {
    return instance.patch(`/users/${id}/role`, {
        value: role,
    })
}