
import { Entity } from "@/types/categories";
// import { API, Callbacks } from "@/types/categories/cu-dialog";
import { api as _api, API, Callbacks } from "./store"

const api: API = {
    openCreate(callbacks: Callbacks) {
        _api.openCreate(callbacks)
    },
    openUpdate(category: Entity.Category, callbacks: Callbacks) {
        _api.openUpdate(category, callbacks)
    },
    close() {
        _api.close()
    }
}

export default api