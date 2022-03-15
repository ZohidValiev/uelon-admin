
import { makeObservable, observable, action } from "mobx"
import { enableStaticRendering } from "mobx-react"
// import { Store, API } from "@/types/info-loader"

enableStaticRendering(typeof window === "undefined")

export interface Store {
    visible: boolean
}

export interface API {
    open(): void
    close(): void
}

class InfoLoaderStore implements Store, API {

    public visible: boolean = false

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

const store = new InfoLoaderStore()
export default store as Store
export const api: API = store