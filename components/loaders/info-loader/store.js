
import { makeObservable, observable, action } from "mobx"
import { enableStaticRendering } from "mobx-react"

enableStaticRendering(typeof window === "undefined")

class Store {
    visible = false

    constructor() {
        makeObservable(this, {
            visible: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open() {
        this.visible = true
    }

    close() {
        this.visible = false
    }
}

const store = new Store()
export default store