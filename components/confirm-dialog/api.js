
import store from "./store"


export default  {
    open(content, { onOk, onCancel }) {
        store.open(content, { onOk, onCancel })
    },
    close() {
        store.close()
    }
}