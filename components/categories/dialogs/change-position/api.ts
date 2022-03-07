
import { api as _api, API } from "./store";


const api: API = {
    openUp(category, callbacks, data) {
        _api.openUp(category, callbacks, data)
    },
    openDown(category, callbacks, data) {
        _api.openDown(category, callbacks, data)
    },
    close() {
        _api.close()
    }
}

export default api