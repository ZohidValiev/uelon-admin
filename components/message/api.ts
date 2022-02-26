
import store from "./store"

export default {
    open(message: string) {
        store.open(message)
    },
    close() {
        store.close()
    }
}