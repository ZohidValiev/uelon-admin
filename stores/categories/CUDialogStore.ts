
import { axiosHttpCode422Thrower } from "@/api/axios";
import { Entity } from "@/types/categories";
import { action, makeObservable, observable, runInAction } from "mobx";

export interface Store {
    visible: boolean
    submited: boolean
    close(): void
    send(endpoint: Endpoint): Promise<void>
    getTitle(): string
    getCategory(): Entity.Category | null
}

export interface Callbacks {
    onOK(id: number): void
    onError?(error: any): void
}

export interface API {
    openCreate(callbacks: Callbacks): void
    openUpdate(category: Entity.Category, callbacks: Callbacks): void
    close(): void
}

export interface Endpoint {
    (category: Entity.Category | null): Promise<number>
}

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
            const id = await endpoint(this.category)
            this._onOK(id)
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

export default CUDialogStore