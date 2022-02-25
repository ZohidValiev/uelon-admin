
import { makeObservable, observable, action, runInAction } from "mobx"
import { Entity, getUserRole, Roles, UserPropertyChangeDialog } from "@/types/users"
import * as api from "@/api/users"
import { enableStaticRendering } from "mobx-react"
import { axiosHttpCode422Thrower } from "@/api/axios"

enableStaticRendering(typeof window === "undefined")

class Store 
{
    public visible: boolean = false
    public submited: boolean = false
    private user: Entity.User | null = null
    private callbacks: UserPropertyChangeDialog.Callbacks | null = null

    constructor() 
    {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open(user: Entity.User, callbacks: UserPropertyChangeDialog.Callbacks) {
        this.visible = true
        this.user = user
        this.callbacks = callbacks
    }

    close() {
        this.visible = false
        this.submited = false
        this.user = null
        this.callbacks = null
    }

    public getUserRole(): Roles {
        return getUserRole(this.user)
    }

    async update(role: Roles)
    {
        runInAction(() => {
            this.submited = true
        })

        try {
            const user = await api.updateUserRole(this.user.id, role)
            this._onOK(user)
        } catch (error) {
            axiosHttpCode422Thrower(error, (error) => {
                this._onError(error)    
            })
        }
        
        this.close()
    }

    private _onOK(user: Entity.User): void {
        if (this.callbacks) {
            this.callbacks.onOK(user)
        }
    }
    
    private _onError(error: any): void {
        if (this.callbacks && this.callbacks.onError) {
            this.callbacks.onError(error)
        }
    }
}

export default new Store()