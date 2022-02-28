
import { API } from "@/types/create-dialog"
import { api as _api } from "./store"
import { Entity } from "@/types/users"

const api: API<Entity.User> = {
    open(callbacks) {
        _api.open(callbacks)
    },
    close() {
        _api.close()
    }
}

export default api