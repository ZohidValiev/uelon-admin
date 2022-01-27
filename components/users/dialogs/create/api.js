
import store from "./store"

const api = {
    open({ onOk, onError }) {
        store.open({ onOk, onError })
    },
    close() {
        store.close()
    }
}

export default api