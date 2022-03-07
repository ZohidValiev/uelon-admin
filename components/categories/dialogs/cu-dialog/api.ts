
import { Entity } from "@/types/categories";
import { API, Callbacks } from "@/types/categories/cu-dialog";
import { api as _api } from "./store"

const api: API = {
    openCreate(callbacks: Callbacks) {
        _api.openCreate(callbacks)
    },
    openUpdate(category: Entity.Category, callbacks: Callbacks) {
        _api.openUpdate(category, callbacks)
    },
    close() {
        _api.close()
    }
}

export default api

// import em from "@/utils/event-manager"

// const EVENT_OPEN   = "category-dialog:open"
// const EVENT_CLOSE  = "category-dialog:close"

// export default {
//     openCreate({endpoint, onOk, onError, onCancel }) {
//         open("Добавить категорию", endpoint, null, { onOk, onError, onCancel })
//     },
//     openUpdate({ endpoint, getData, onOk, onError, onCancel }) {
//         open("Редактировать категорию", endpoint, getData, { onOk, onError, onCancel })
//     },
//     close() {
//         em.trigger(EVENT_CLOSE)
//     }
// }

// function open(title, endpoint, getData, { onOk, onError, onCancel }) {

//     let _onOk = onOk ?? ((category) => {
//         onOk && onOk(category)
//     })

//     let _onError = onError ?? ((error) => {
//         onError && onError(error)
//     })

//     let _onCancel = onCancel ?? (() => {
//         onCancel && onCancel(error)
//     })

    
//     getData ??= () => null

//     em.trigger(EVENT_OPEN, title, endpoint, getData, _onOk, _onError, _onCancel)
// }
