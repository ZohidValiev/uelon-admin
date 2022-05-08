
import { DTO, Entity } from "@/types/categories"
import { instance, patch } from "./axios"
import { IdDto } from "@/types/common"

export async function create(data: DTO.Create): Promise<number> {
    return (await (instance.post<IdDto>('/categories', data))).data.id
}

export async function update(id: number, data: DTO.Update): Promise<number> {
    return (await patch<IdDto>(`/categories/${id}`, data)).data.id
}

export async function remove(id: number): Promise<void> {
    await (instance.delete<void>(`/categories/${id}`))
}

export async function changePosition(id: number, position: number): Promise<number> {
    return (await (patch<IdDto>(`/categories/${id}/position`, { 
        position 
    }))).data.id
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