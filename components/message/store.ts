
import { makeObservable, observable, action } from "mobx"
import { enableStaticRendering } from "mobx-react"

enableStaticRendering(typeof window === "undefined")

class Store {
    public visible: boolean = false
    private message: string | null = null

    constructor() {
        makeObservable(this, {
            visible: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    public open(message: string) {
        this.visible = true
        this.message = message
    }

    public close() {
        this.visible = false
        this.message = null
    }

    public getMessage(): string {
        return this.message
    }
}

const store = new Store()
export default store