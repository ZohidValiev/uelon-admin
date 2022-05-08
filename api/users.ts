
import { instance, patch }  from "./axios"
import { DTO, Entity, Roles, Status } from "@/types/users"
import { IdDto } from "@/types/common"


export async function loadUsers(): Promise<Entity.User[]> {
    return (await instance.get<Entity.User[]>("/users")).data
}

export async function loadUser(id: number): Promise<Entity.User> {
    return (await instance.get<Entity.User>(`/users/${id}`)).data
}

export async function createUser(data: DTO.CreateUser): Promise<number> {
    return (await instance.post<IdDto>(`/users`, data)).data.id
}

export async function updateUserNickname(id: number, nickname: string): Promise<number> {
    const data = {
        nickname
    }
    return (await patch<IdDto>(`/users/${id}/nickname`, data)).data.id
}

export async function updateUserStatus(id :number, status: Status): Promise<number> {
    const data = {
        status
    }
    return (await patch<IdDto>(`/users/${id}/status`, data)).data.id
}

export async function updateUserRole(id: number, role: Roles): Promise<number> {
    const data = {
        role
    }
    return (await patch<IdDto>(`/users/${id}/role`, data)).data.id
}

export async function remove(id: number): Promise<void> {
    await instance.delete(`/users/${id}`);
}