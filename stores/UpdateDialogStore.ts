
import { action, makeObservable, observable, runInAction } from "mobx"
import { axiosHttpCode422Thrower } from "@/api/axios";
import { enableStaticRendering } from "mobx-react";
import { ID } from "@/types/common";

enableStaticRendering(typeof window === "undefined")

export interface EndpointResult<Data> {
    id: ID
    data: Data
}

export interface Endpoint<E, FormData> {
    (entity: E): Promise<EndpointResult<FormData>>
}

export interface Store<E, FormData, Data={}> {
    visible: boolean
    submited: boolean
    entity: E
    data: Data | null
    send(endpoint: Endpoint<E, FormData>): void
    close: () => void
}

export interface Callbacks<Data> {
    onOK: (id: ID, data: Data) => void
    onError?: (error: any) => void
}

export interface API<E, FormData, Data={}> {
    open: (entity: E, callbacks: Callbacks<FormData>, data?: Data) => void
    close: () => void
}

class UpdateDialogStore<E, FormData, Data = {}> implements Store<E, FormData, Data>, API<E, FormData> {

    public visible: boolean = false
    public submited: boolean = false
    public entity: E | null = null
    public data: Data | null = null
    protected callbacks: Callbacks<FormData> | null = null

    constructor() {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open(entity: E, callbacks: Callbacks<FormData>, data?: Data): void {
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

    async send(endpoint: Endpoint<E, FormData>)
    {
        runInAction(() => {
            this.submited = true
        })

        try {
            const result = await endpoint(this.entity)    
            this._onOK(result.id, result.data)
        } catch (error) {
            axiosHttpCode422Thrower(error, (error) => {
                this._onError(error)
            })
        }

        this.close()
    }

    private _onOK(id: ID, data: FormData) {
        if (this.callbacks) {
            this.callbacks.onOK(id, data)
        }
    }

    private _onError(error: any) {
        if (this.callbacks && this.callbacks.onError) {
            this.callbacks.onError(error)
        }
    }
}

export default UpdateDialogStore