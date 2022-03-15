
import { makeObservable, action, observable } from "mobx"
// import { Callbacks, API, Store } from "@/types/confirm-dialog"
import { enableStaticRendering } from "mobx-react"

enableStaticRendering(typeof window === "undefined")

export interface Store {
    visible: boolean
    content: string
    onOK(): void
    onCancel(): void
}

export interface Callbacks {
    onOK(): void
    onCancel?(): void
}

export interface API {
    open(content: string, callbacks: Callbacks): void
    close(): void
}

class ConfirmDialogStore implements API, Store {

    public visible: boolean = false
    public content: string | null = null
    private callbacks: Callbacks | null = null

    constructor() {
        makeObservable(this, {
            visible: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    public onOK() {
        try {
            if (this.callbacks) {
                this.callbacks.onOK()
            }
        } finally {
            this.close()    
        }
    }

    public onCancel() {
        try {
            if (this.callbacks && this.callbacks.onCancel) {
                this.callbacks.onCancel()
            }
        } finally {
            this.close()    
        }
    }

    public open(content: string, callbacks: Callbacks) {
        this.visible = true
        this.content = content
        this.callbacks = callbacks
    }

    public close() {
        this.visible = false
        this.content = null
        this.callbacks = null
    }
}

const store = new ConfirmDialogStore()

export default store as Store
export const api: API = store