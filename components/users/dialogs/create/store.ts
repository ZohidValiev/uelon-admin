
import { observable, makeObservable, action, runInAction } from "mobx"
import { enableStaticRendering } from "mobx-react"
import * as api from "@/api/users"
import { UserCreateDialog, DTO } from "@/types/users"
import { axiosHttpCode422Thrower } from "@/api/axios"

enableStaticRendering(typeof window === "undefined")

class Store {
    visible: boolean = false
    submited: boolean = false
    callbacks: UserCreateDialog.Callbacks | null = null

    constructor() {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open(callbacks: UserCreateDialog.Callbacks): void {
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
            const user = await api.createUser(data)

            if (this.callbacks) {
                this.callbacks.onOK(user)
            }    
        } catch (error) {
            axiosHttpCode422Thrower(error, (error) => {
                if (this.callbacks.onError) {
                    this.callbacks.onError(error)
                }
            })
        }
        
        this.close()
    }
}

const store = new Store()
export default store