
import { instance }  from "./axios"
import { DTO, Entity, Auth, Roles, Status } from "../types/users"


export async function loadUsers(): Promise<Entity.User[]> {
    return (await instance.get<Entity.User[]>("/users?_order[id]=desc")).data
}

export async function loadUser(id: number): Promise<Entity.User> {
    return (await instance.get<Entity.User>(`/users/${id}`)).data
}

export async function login(email: string, password: string): Promise<Auth.Data> {
    return (await instance.post<Auth.Data>("/login_check", {
        email,
        password,
    })).data
}

export async function createUser(data: DTO.CreateUser): Promise<Entity.User> {
    return (await instance.post<Entity.User>(`/users`, data)).data
}

export async function updateUserNickname(id: number, nickname: string): Promise<Entity.User> {
    return (await instance.patch<Entity.User>(`/users/${id}/nickname`, {
        value: nickname,
    })).data
}

export async function updateUserStatus(id :number, status: Status): Promise<Entity.User> {
    return (await instance.patch<Entity.User>(`/users/${id}/status`, {
        value: status,
    })).data
}

export async function updateUserRole(id: number, role: Roles): Promise<Entity.User> {
    return (await instance.patch<Entity.User>(`/users/${id}/role`, {
        value: role,
    })).data
}