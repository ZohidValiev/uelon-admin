
import em from "@/utils/event-manager"

const EVENT_OPEN  = "change-position-dialog:open"
const EVENT_CLOSE = "change-position-dialog:close"

export default {
    openUp(data = { category, categoriesLength }, callbacks = { onOk, onError, onClose }) {
        open("up", "Поднять позицию", data, callbacks)
    },
    openDown(data = { category, categoriesLength }, callbacks = { onOk, onError, onClose }) {
        open("down", "Опустить позицию", data, callbacks)
    },
    close() {
        em.trigger(EVENT_CLOSE)
    },
}

function open(type, title, data, callbacks) {
    em.trigger(EVENT_OPEN, type, title, data, callbacks)
}
