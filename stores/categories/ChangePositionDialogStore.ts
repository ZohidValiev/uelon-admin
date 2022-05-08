
import { axiosHttpCode422Thrower } from "@/api/axios";
import { Entity } from "@/types/categories"
import { action, makeObservable, observable, runInAction } from "mobx";

export type Data = {
    categoriesLength: number
}

export interface Store {
    type: "up" | "down" | null
    title: string | null
    visible: boolean
    submited: boolean
    category: Entity.Category | null
    data: Data | null
    send(endpoint: Endpoint): void
    close(): void
}

export interface API {
    openUp(category: Entity.Category, data: Data, callbacks: Callbacks): void
    openDown(category: Entity.Category, data: Data, callbacks: Callbacks): void
    close(): void
}

export interface Callbacks {
    onOK(id: number): void
    onError?(error: any): void
}

export interface Endpoint {
    (category: Entity.Category): Promise<number>
}

class ChangePositionDialogStore implements Store, API {

    public type: "up" | "down" | null
    public title: string | null = null
    public visible: boolean = false
    public submited: boolean = false
    public category: Entity.Category | null
    public data: Data | null = null
    private callbacks: Callbacks | null

    constructor() {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            openUp: action.bound,
            openDown: action.bound,
            close: action.bound,
        })
    }

    async send(endpoint: Endpoint) {
        runInAction(() => {
            this.submited = true
        })

        try {
            const id = await endpoint(this.category)
            this._onOK(id)
        } catch (error) {
            axiosHttpCode422Thrower(error, (error) => {
                this._onError(error)
            })
        }

        this.close()
    }

    openUp(category: Entity.Category, data: Data, callbacks: Callbacks): void {
        this.type = "up"
        this.title = "Поднять позицию"
        this.visible = true
        this.category = category
        this.data = data
        this.callbacks = callbacks
    }
    
    openDown(category: Entity.Category, data: Data, callbacks: Callbacks): void {
        this.type = "down"
        this.title = "Опустить позицию"
        this.visible = true
        this.category = category
        this.data = data
        this.callbacks = callbacks
    }

    close(): void {
        this.type = null
        this.visible = false
        this.submited = false
        this.category = null
        this.data = null
        this.callbacks = null
    }

    private _onOK(id: number) {
        if (this.callbacks) {
            this.callbacks.onOK(id)
        }
    }
    
    private _onError(error: any) {
        if (this.callbacks && this.callbacks.onError) {
            this.callbacks.onError(error)
        }
    }
}

export default ChangePositionDialogStore