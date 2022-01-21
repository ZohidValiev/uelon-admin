
import { makeObservable, observable, action, runInAction, autorun } from "mobx"
import * as api from "@/api/users"


class Store 
{
    visible = false
    submited = false
    user = null
    onOk = null
    onError = null

    constructor() 
    {
        makeObservable(this, {
            visible: observable,
            submited: observable,
            open: action.bound,
            close: action.bound,
        })
    }

    open(user, { onOk, onError }) 
    {
        this.visible = true
        this.user = user
        this.onOk = onOk
        this.onError = onError
    }

    close() 
    {
        this.visible = false
        this.submited = false
        this.user = null
        this.onOk = null
        this.onError = null
    }

    async update(nickname)
    {
        runInAction(() => {
            this.submited = true
        })

        try {
            const { data } = await api.updateUserNickname(this.user.id, nickname)    
            this.onOk(data)
        } catch (error) {
            this.onError && this.onError(error)
        }
        
        this.close()
    }
}

export default new Store()