
import { API, Callbacks } from "@/types/users/user-create-dialog"
import { api as _api } from "@/stores/users/UserCreateDialogStore"

const api: API = {
    open(callbacks: Callbacks) {
        _api.open(callbacks)
    },
    close() {
        _api.close()
    }
}

export default api