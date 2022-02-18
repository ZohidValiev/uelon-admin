
import { instance } from "./axios"

export async function create(data: any) {
    return instance.post('/categories', data)
}

export async function update(id: number, data: any) {
    return instance.patch(`/categories/${id}`, data)
}

export async function remove(id: number) {
    return instance.delete(`/categories/${id}`)
}

export async function changePosition(id: number, position: number) {
    return instance.patch(`/categories/${id}/position`, { position })
}

export async function loadCategoryByPath(path: string) {
    return instance.get(path)
}

export async function loadCategory(id: number) {
    return instance.get(`/categories/${id}`)
}

export async function loadCategoriesLevel1() {
    return instance.get('/categories', {
        headers: {
            accept: "application/json"
        }
    })
}

export async function loadCategoriesLevel2(parentId: number) {
    return instance.get(`/categories/${parentId}/children`, {
        headers: {
            accept: "application/json"
        }
    })
}

export async function loadCategoriesLevel3(parentId: number) {
    return loadCategoriesLevel2(parentId)
}