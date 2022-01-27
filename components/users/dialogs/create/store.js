
import { observable, makeObservable, action, runInAction } from "mobx"
import { enableStaticRendering } from "mobx-react"
import * as api from "@/api/users"

enableStaticRendering(typeof window === "undefined")

class Store {
    visible = false
    submited = false
    onOk = null
    onError = null

    constructor() {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open({ onOk, onError }) {
        this.visible = true
        this.onOk = onOk
        this.onError = onError
    }

    close() {
        this.visible = false
        this.submited = false
        this.onOk = null
        this.onError = null
    }

    async createUser(fields) {
        runInAction(() => {
            this.submited = true
        })

        try {
            const { data } = await api.createUser(fields)
            this.onOk(data)
        } catch (error) {
            this.onError && this.onError(error)
        }

        this.close()
    }
}

const store = new Store()
export default store