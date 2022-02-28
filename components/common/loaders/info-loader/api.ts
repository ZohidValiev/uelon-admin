
import { API } from "@/types/info-loader"
import { api as _api } from "@/stores/InfoLoaderStore"

const api: API = {
    open() {
        _api.open()
    },
    close() {
        _api.close()
    },
}

export default api