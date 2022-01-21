
import em from "@/utils/event-manager"

const EVENT_OPEN   = "category-create-dialog:open"
const EVENT_CLOSE  = "category-create-dialog:close"
const EVENT_OK     = "category-create-dialog:ok"
const EVENT_ERROR  = "category-create-dialog:error"
const EVENT_CANCEL = "category-create-dialog:cancel"

export default {
    open(title, parentId, { onOk, onError, onCancel }) {

        reset()

        if (onOk) {
            em.on(EVENT_OK, (category) => {
                onOk(category)
            })
        }

        if (onError) {
            em.on(EVENT_ERROR, (error) => {
                onError(error)
            })
        }

        if (onCancel) {
            em.on(EVENT_CANCEL, () => {
                reset()
                onCancel()
            })
        }

        em.trigger(EVENT_OPEN, title, parentId)
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