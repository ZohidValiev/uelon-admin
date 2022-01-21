
import store from "./store"


export default {
    open(user, callbacks) {
        store.open(user, callbacks)
    },
    close() {
        store.close()
    }
}