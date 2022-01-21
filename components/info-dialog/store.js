
import { makeObservable, observable, action } from "mobx"


class Store 
{
    type    = null
    title   = null
    content = null
    visible = false

    constructor() {
        makeObservable(this, {
            visible: observable,
            openInfo: action.bound,
            openError: action.bound,
            close: action.bound,
        })
    }

    openInfo(title, content) {
        this.type = ""
        this.title = title
        this.content = content
        this.visible = true
    }

    openError(title, content) {
        this.type = "error"
        this.title = title
        this.content = content
        this.visible = true
    }

    close() {
        this.type = null
        this.title = null
        this.content = null
        this.visible = false
    }
}

export default new Store()