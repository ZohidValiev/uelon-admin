
import * as xhr from "./axios"

export async function loadUsers() {
    return xhr.get("/api/users?_order[id]=desc")
}

export async function loadUser(id) {
    return xhr.get(`/api/users/${id}`)
}

export async function getUserByCredentials(username, password) {
    return xhr.patch("/api/users/0/signin", {
        username,
        password,
    })
}

export async function createUser(data) {
    return xhr.post(`/api/users`, data)
}

export async function updateUserNickname(id, nickname) {
    return xhr.patch(`/api/users/${id}/nickname`, {
        value: nickname,
    })
}

export async function updateUserStatus(id, status) {
    return xhr.patch(`/api/users/${id}/status`, {
        value: status,
    })
}

export async function updateUserRole(id, role) {
    return xhr.patch(`/api/users/${id}/role`, {
        value: role,
    })
}