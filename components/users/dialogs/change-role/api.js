
import store from "./store"


export default {
    open(user, { onOk, onError}) {
        store.open(user, { onOk, onError })
    },
    close() {
        store.close()
    }
}