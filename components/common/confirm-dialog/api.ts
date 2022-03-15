
// import { API } from "@/types/confirm-dialog"
import { api as _api, API } from "@/stores/ConfirmDialogStore"


const api: API = {
    open(content, callbacks) {
        _api.open(content, callbacks)
    },
    close() {
        _api.close()
    }
}

export default api