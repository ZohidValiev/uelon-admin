
import { Entity, UserPropertyChangeDialog } from "@/types/users"
import store from "./store"


const api: UserPropertyChangeDialog.Api = {
    open(user: Entity.User, callbacks: UserPropertyChangeDialog.Callbacks) {
        store.open(user, callbacks)
    },
    close() {
        store.close()
    }
}

export default api