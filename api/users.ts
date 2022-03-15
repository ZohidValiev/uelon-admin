
import { instance, patch }  from "./axios"
import { DTO, Entity, Roles, Status } from "@/types/users"


export async function loadUsers(): Promise<Entity.User[]> {
    return (await instance.get<Entity.User[]>("/users?_order[id]=desc")).data
}

export async function loadUser(id: number): Promise<Entity.User> {
    return (await instance.get<Entity.User>(`/users/${id}`)).data
}

export async function createUser(data: DTO.CreateUser): Promise<Entity.User> {
    return (await instance.post<Entity.User>(`/users`, data)).data
}

export async function updateUserNickname(id: number, nickname: string): Promise<Entity.User> {
    const data = {
        value: nickname
    }
    return (await patch<Entity.User>(`/users/${id}/nickname`, data)).data
}

export async function updateUserStatus(id :number, status: Status): Promise<Entity.User> {
    const data = {
        value: status
    }
    return (await patch<Entity.User>(`/users/${id}/status`, data)).data
}

export async function updateUserRole(id: number, role: Roles): Promise<Entity.User> {
    const data = {
        value: role
    }
    return (await patch<Entity.User>(`/users/${id}/role`, data)).data
}