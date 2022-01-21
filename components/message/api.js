
import em from "@/utils/event-manager"

export default {
    open(message) {
        em.trigger("message:open", message)
    },
    close() {
        em.trigger("message:close")
    }
}