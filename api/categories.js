
import * as xhr from "./axios"

export async function create(data) {
    return xhr.post('/api/categories', data)
}

export async function update(id, data) {
    return xhr.patch(`/api/categories/${id}`, data)
}

export async function remove(id) {
    return xhr.remove(`/api/categories/${id}`)
}

export async function changePosition(id, position) {
    return xhr.patch(`/api/categories/${id}/position`, { position })
}

export async function loadCategoryByPath(path) {
    return xhr.get(path)
}

export async function loadCategory(id) {
    return xhr.get(`/api/categories/${id}`)
}

export async function loadCategoriesLevel1() {
    return xhr.get('/api/categories', {
        headers: {
            accept: "application/json"
        }
    })
}

export async function loadCategoriesLevel2(parentId) {
    return xhr.get(`/api/categories/${parentId}/children`, {
        headers: {
            accept: "application/json"
        }
    })
}

export async function loadCategoriesLevel3(parentId) {
    return loadCategoriesLevel2(parentId)
}