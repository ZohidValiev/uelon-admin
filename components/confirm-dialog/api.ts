
import { API } from "./types"
import { api as _api } from "./store"


const api: API = {
    open(content, callbacks) {
        _api.open(content, callbacks)
    },
    close() {
        _api.close()
    }
}

export default api