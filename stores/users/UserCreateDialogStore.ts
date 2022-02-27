
import { observable, makeObservable, action, runInAction } from "mobx"
import { enableStaticRendering } from "mobx-react"
import { createUser } from "@/api/users"
import { axiosHttpCode422Thrower } from "@/api/axios"
import { Store, API, Callbacks } from "@/types/users/user-create-dialog"
import { DTO, Entity } from "@/types/users"

enableStaticRendering(typeof window === "undefined")

class UserCreateDialogStore implements Store, API {
    
    public visible: boolean = false
    public submited: boolean = false
    private callbacks: Callbacks | null = null

    constructor() {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open(callbacks: Callbacks): void {
        this.visible = true
        this.callbacks = callbacks
    }

    close() {
        this.visible = false
        this.submited = false
        this.callbacks = null
    }

    async createUser(data: DTO.CreateUser) {
        runInAction(() => {
            this.submited = true
        })

        try {
            const user = await createUser(data)
            this._onOK(user)
        } catch (error) {
            axiosHttpCode422Thrower(error, (error) => {
                this._onError(error)
            })
        } finally {
            this.close()
        }
    }

    private _onOK(user: Entity.User) {
        if (this.callbacks) {
            this.callbacks.onOK(user)
        }    
    }
    
    private _onError(error: any) {
        if (this.callbacks && this.callbacks.onError) {
            this.callbacks.onError(error)
        }
    }
}

const store = new UserCreateDialogStore()
export default store as Store
export const api: API = store