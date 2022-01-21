
import { makeObservable, observable, action, runInAction } from "mobx"
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

    async update(role)
    {
        runInAction(() => {
            this.submited = true
        })

        try {
            //const { data } = await api.updateRole(this.user.id, role)    
            const data = await new Promise((resolve) => {
                setTimeout(() => {
                    const _user = {
                        id: 100,
                        nickname: "user100",
                        email: "user100@gmail.com",
                        roles: [
                            "ROLE_USER",
                            "ROLE_GUEST",
                        ],
                        status: 2,
                        createTime: "01.01.2022",
                        updateTime: "01.01.2022",
                    }
                    resolve(_user)
                }, 5000)
            })
            this.onOk(data)
        } catch (error) {
            this.onError && this.onError(error)
        }
        
        this.close()
    }
}

export default new Store()