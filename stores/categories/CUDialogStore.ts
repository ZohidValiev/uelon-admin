
import { axiosHttpCode422Thrower } from "@/api/axios";
import { Entity } from "@/types/categories";
import { API, Callbacks, Endpoint, Store } from "@/types/categories/cu-dialog";
import { action, makeObservable, observable, runInAction } from "mobx";


class CUDialogStore implements Store, API {
    visible: boolean = false
    submited: boolean = false
    private title: string | null = null
    private category: Entity.Category | null = null
    private callbacks: Callbacks

    constructor() {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            openCreate: action.bound,
            openUpdate: action.bound,
            close: action.bound,
        })
    }

    getTitle(): string {
        return this.title
    }

    getCategory(): Entity.Category | null {
        return this.category
    }

    async send(endpoint: Endpoint): Promise<void> {
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

    openCreate(callbacks: Callbacks): void {
        this._open("Добавить категорию", null, callbacks)
    }

    openUpdate(category: Entity.Category, callbacks: Callbacks): void {
        this._open("Редактировать категорию", category, callbacks)
    }

    private _open(title: string, category: Entity.Category | null, callbacks: Callbacks) {
        this.title = title
        this.visible = true
        this.submited = false
        this.category = category
        this.callbacks = callbacks
    }

    close(): void {
        this.title = null
        this.visible = false
        this.submited = false
        this.category = null
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

export default CUDialogStore