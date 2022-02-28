
import { action, makeObservable, observable, runInAction } from "mobx"
import { axiosHttpCode422Thrower } from "@/api/axios";
import { Store, API, Callbacks, Endpoint } from "@/types/create-dialog"
import { enableStaticRendering } from "mobx-react";

enableStaticRendering(typeof window === "undefined")

class CreateDialogStore<E> implements Store<E>, API<E> {

    public visible: boolean = false
    public submited: boolean = false
    protected callbacks: Callbacks<E> | null = null

    constructor() {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open(callbacks: Callbacks<E>): void {
        this.visible = true
        this.callbacks = callbacks
    }

    close() 
    {
        this.visible = false
        this.submited = false
        this.callbacks = null
    }

    async send(endpoint: Endpoint<E>)
    {
        runInAction(() => {
            this.submited = true
        })

        try {
            const entity = await endpoint()    
            this._onOK(entity)
        } catch (error) {
            axiosHttpCode422Thrower(error, (error) => {
                this._onError(error)
            })
        }

        this.close()
    }

    private _onOK(entity: E) {
        if (this.callbacks) {
            this.callbacks.onOK(entity)
        }
    }

    private _onError(error: any) {
        if (this.callbacks && this.callbacks.onError) {
            this.callbacks.onError(error)
        }
    }
}

export default CreateDialogStore