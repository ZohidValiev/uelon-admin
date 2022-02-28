
import { ReactNode } from "react"
import { API } from "@/types/info-dialog"
import { api as _api } from "@/stores/InfoDialogStore"

const api: API = {
    openInfo(title: string, content: string | ReactNode) {
        _api.openInfo(title, content)
    },
    openError(title: string, content: string | ReactNode) {
        _api.openError(title, content)
    },
    close() {
        _api.close()
    }
}

export default api