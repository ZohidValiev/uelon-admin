
import { ReactNode } from "react"
import { makeObservable, observable, action } from "mobx"
import { enableStaticRendering } from "mobx-react"
import { Store, API } from "@/types/info-dialog"

enableStaticRendering(typeof window === "undefined")

class InfoDialogStore implements Store, API
{
    type: string | null = null
    title: string | null = null
    content: string | ReactNode | null = null
    visible: boolean = false

    constructor() {
        makeObservable(this, {
            visible: observable,
            openInfo: action.bound,
            openError: action.bound,
            close: action.bound,
        })
    }

    openInfo(title: string, content: string|ReactNode) {
        this.type = ""
        this.title = title
        this.content = content
        this.visible = true
    }

    openError(title: string, content: string|ReactNode) {
        this.type = "error"
        this.title = title
        this.content = content
        this.visible = true
    }

    close() {
        this.type = null
        this.title = null
        this.content = null
        this.visible = false
    }
}

const store = new InfoDialogStore()
export default store as Store
export const api: API = store