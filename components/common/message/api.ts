
import { API } from "@/types/message"
import { api as _api } from "@/stores/MessageStore"

 const api: API = {
    open(message: string) {
        _api.open(message)
    },
    close() {
        _api.close()
    }
}

export default api