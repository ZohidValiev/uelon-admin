
import store from "./store"

export default {
    openInfo(title, content) {
        store.openInfo(title, content)
    },
    openError(title, content) {
        store.openError(title, content)
    },
    close() {
        store.close()
    }
}

