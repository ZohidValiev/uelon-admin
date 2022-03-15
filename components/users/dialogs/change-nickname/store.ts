
import UpdateDialogStore, { API, Store } from "@/stores/UpdateDialogStore"
// import { Store, API } from "@/types/update-dialog"
import { Entity } from "@/types/users"


const store = new UpdateDialogStore<Entity.User>()
export default store as Store<Entity.User>
export const api: API<Entity.User> = store