
// import { API } from "@/types/update-dialog"
import { Entity } from "@/types/users"
import { api as _api, API } from "./store"


const api: API<Entity.User> = {
    open(user, callbacks) {
        _api.open(user, callbacks)
    },
    close() {
        _api.close()
    }
}

export default api