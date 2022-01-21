
import * as xhr from "./axios"

export async function loadUsers() {
    return xhr.get("/api/users?_order[id]=desc")
}

export async function loadUser(id) {
    return xhr.get(`/api/users/${id}`)
}

export async function updateUserNickname(id, nickname) {
    return xhr.patch(`/api/users/${id}/nickname`, {
        nickname,
    })
}