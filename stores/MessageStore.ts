
import { makeObservable, observable, action } from "mobx"
import { enableStaticRendering } from "mobx-react"
// import { Store, API } from "@/types/message"

enableStaticRendering(typeof window === "undefined")

export interface Store {
    visible: boolean
    getMessage(): string
}

export interface API {
    open(message: string): void
    close(): void
}

class MessageStore implements Store, API {

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

const store = new MessageStore()
export default store as Store
export const api: API = store