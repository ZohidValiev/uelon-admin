
import { makeObservable, action, observable } from "mobx"
import { Callbacks, API, Store } from "@/types/confirm-dialog"


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