
import { UserPropertyChangeDialog } from "@/types/users"
import store from "./store"


const api: UserPropertyChangeDialog.Api = {
    open(user, callbacks) {
        store.open(user, callbacks)
    },
    close() {
        store.close()
    }
}

export default api