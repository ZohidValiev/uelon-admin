
import { action, makeObservable, observable, runInAction } from "mobx"
import { axiosHttpCode422Thrower } from "@/api/axios";
// import { Store, API, Callbacks, Endpoint } from "@/types/update-dialog"
import { enableStaticRendering } from "mobx-react";

enableStaticRendering(typeof window === "undefined")

export interface Store<E, Data={}> {
    visible: boolean
    submited: boolean
    entity: E
    data: Data | null
    send(endpoint: Endpoint<E>): void
    close: () => void
}

export interface Callbacks<E> {
    onOK: (entity: E) => void
    onError?: (error: any) => void
}

export interface API<E, Data={}> {
    open: (entity: E, callbacks: Callbacks<E>, data?: Data) => void
    close: () => void
}

export interface Endpoint<E> {
    (entity: E): Promise<E>
}

class UpdateDialogStore<E, Data = {}> implements Store<E>, API<E> {

    public visible: boolean = false
    public submited: boolean = false
    public entity: E | null = null
    public data: Data | null = null
    protected callbacks: Callbacks<E> | null = null

    constructor() {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open(entity: E, callbacks: Callbacks<E>, data?: Data): void {
        this.visible = true
        this.entity = entity
        this.data = data ?? null
        this.callbacks = callbacks
    }

    close() 
    {
        this.visible = false
        this.submited = false
        this.entity = null
        this.data = null
        this.callbacks = null
    }

    async send(endpoint: Endpoint<E>)
    {
        runInAction(() => {
            this.submited = true
        })

        try {
            const entity = await endpoint(this.entity)    
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

export default UpdateDialogStore