
import { UserCreateDialog } from "@/types/users"
import store from "./store"

const api: UserCreateDialog.Api = {
    open(callbacks: UserCreateDialog.Callbacks) {
        store.open(callbacks)
    },
    close() {
        store.close()
    }
}

export default api