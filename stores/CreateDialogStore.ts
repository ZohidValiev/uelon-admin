
import { action, makeObservable, observable, runInAction } from "mobx"
import { axiosHttpCode422Thrower } from "@/api/axios";
import { enableStaticRendering } from "mobx-react";

enableStaticRendering(typeof window === "undefined")

export interface Store<E> {
    visible: boolean
    submited: boolean
    send(endpoint: Endpoint<E>): void
    close: () => void
}

export interface Callbacks<E> {
    onOK: (idOrEntity: E) => void
    onError?: (error: any) => void
}

export interface API<E> {
    open: (callbacks: Callbacks<E>) => void
    close: () => void
}

export interface Endpoint<E> {
    (): Promise<E>
}

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
            const idOrEntity = await endpoint()    
            this._onOK(idOrEntity)
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