
import store from "./store"

const api = {
    open() {
        store.open()
    },
    close() {
        store.close()
    },
}

export default api