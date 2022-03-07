
import { DTO, Entity } from "@/types/categories"
import { instance, patch } from "./axios"

export async function create(data: DTO.Create): Promise<Entity.Category> {
    return (await (instance.post<Entity.Category>('/categories', data))).data
}

export async function update(id: number, data: DTO.Update): Promise<Entity.Category> {
    return (await patch<Entity.Category>(`/categories/${id}`, data)).data
}

export async function remove(id: number): Promise<void> {
    return (await (instance.delete<void>(`/categories/${id}`))).data
}

export async function changePosition(id: number, position: number): Promise<Entity.Category> {
    return (await (patch<Entity.Category>(`/categories/${id}/position`, { 
        position 
    }))).data
}

export async function loadCategoryByPath(path: string): Promise<Entity.Category> {
    return (await (instance.get<Entity.Category>(path))).data
}

export async function loadCategory(id: number): Promise<Entity.Category> {
    return (await (instance.get<Entity.Category>(`/categories/${id}`))).data
}

export async function loadCategoriesLevel1(): Promise<Entity.Category> {
    return (await instance.get<Entity.Category>('/categories', {
        headers: {
            accept: "application/json"
        }
    })).data
}

export async function loadCategoriesLevel2(parentId: number): Promise<Entity.Category> {
    return (await instance.get<Entity.Category>(`/categories/${parentId}/children`, {
        headers: {
            accept: "application/json"
        }
    })).data
}

export async function loadCategoriesLevel3(parentId: number) {
    return loadCategoriesLevel2(parentId)
}