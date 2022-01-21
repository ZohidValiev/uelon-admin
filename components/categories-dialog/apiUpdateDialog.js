
import em from "@/utils/event-manager"

const EVENT_OPEN   = "category-update-dialog:open"
const EVENT_CLOSE  = "category-update-dialog:close"
const EVENT_OK     = "category-update-dialog:ok"
const EVENT_ERROR  = "category-update-dialog:error"
const EVENT_CANCEL = "category-update-dialog:cancel"

export default {
    open(title, category, onOk, onError, onCancel) {

        if (onOk) {
            em.on(EVENT_OK, (category) => {
                reset()
                onOk(category)
            })
        }

        if (onError) {
            em.on(EVENT_ERROR, (error) => {
                reset()
                onError(error)
            })
        }

        if (onCancel) {
            em.on(EVENT_CANCEL, () => {
                reset()
                onCancel()
            })
        }

        em.trigger(EVENT_OPEN, title, category)
    },
    close() {
        reset()
        e.trigger(EVENT_CLOSE)
    }
}

function reset() {
    em.off(EVENT_OK)
    em.off(EVENT_CANCEL)
    em.off(EVENT_ERROR)
}