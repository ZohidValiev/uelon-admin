
import { makeObservable, observable, action } from "mobx"
import { enableStaticRendering } from "mobx-react"

enableStaticRendering(typeof window === "undefined")

class Store {
    visible = false
    content = null
    onOk = null
    onCancel = null

    constructor() {
        makeObservable(this, {
            visible: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open(content, { onOk, onCancel }) {
        this.visible = true
        this.content = content
        this.onOk = onOk
        this.onCancel = onCancel
    }

    close() {
        this.visible = false
        this.content = null
        this.onOk = null
        this.onCancel = null
    }
}

export default new Store()