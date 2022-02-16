
import { ReactNode } from "react"
import { makeObservable, observable, action } from "mobx"
import { enableStaticRendering } from "mobx-react"

enableStaticRendering(typeof window === "undefined")

class Store 
{
    type: string = null
    title: string   = null
    content: string|ReactNode = null
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

export default new Store()