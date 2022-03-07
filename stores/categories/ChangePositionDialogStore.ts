
import { axiosHttpCode422Thrower } from "@/api/axios";
import { Entity } from "@/types/categories"
import { Store, API, Callbacks, Data, Endpoint } from "@/types/categories/change-position-dialog"
import { action, makeObservable, observable, runInAction } from "mobx";


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
            const category = await endpoint(this.category)
            this._onOK(category)
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

    private _onOK(category: Entity.Category) {
        if (this.callbacks) {
            this.callbacks.onOK(category)
        }
    }
    
    private _onError(error: any) {
        if (this.callbacks && this.callbacks.onError) {
            this.callbacks.onError(error)
        }
    }
}

export default ChangePositionDialogStore