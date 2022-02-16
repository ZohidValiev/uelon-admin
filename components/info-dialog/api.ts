
import { ReactNode } from "react"
import store from "./store"

export default {
    openInfo(title: string, content: string|ReactNode) {
        store.openInfo(title, content)
    },
    openError(title: string, content: string|ReactNode) {
        store.openError(title, content)
    },
    close() {
        store.close()
    }
}

