
import { makeObservable, observable, action, runInAction, autorun } from "mobx"
import { Entity, UserChangeDialog } from "@/types/users"
import { axiosHttpCode422Thrower } from "@/api/axios"
import * as api from "@/api/users"
import { enableStaticRendering } from "mobx-react"

enableStaticRendering(typeof window === "undefined")

class Store 
{
    public visible: boolean = false
    public submited: boolean = false
    private user: Entity.User | null = null
    private callbacks: UserChangeDialog.Callbacks | null = null

    constructor() 
    {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open(user: Entity.User, callbacks: UserChangeDialog.Callbacks) 
    {
        this.visible = true
        this.user = user
        this.callbacks = callbacks
    }

    close() 
    {
        this.visible = false
        this.submited = false
        this.user = null
        this.callbacks = null
    }

    public getUserNickname(): string {
        return this.user.nickname
    }

    async update(nickname: string)
    {
        runInAction(() => {
            this.submited = true
        })

        try {
            const user = await api.updateUserNickname(this.user.id, nickname)    
            this._onOK(user)
        } catch (error) {
            axiosHttpCode422Thrower(error, (error) => {
                this._onError(error)
            })
        }
        
        this.close()
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

export default new Store()