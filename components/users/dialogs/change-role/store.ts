
// import { API, Store } from "@/types/update-dialog"
import UpdateDialogStore, { API, Store } from "@/stores/UpdateDialogStore"
import { Entity } from "@/types/users"


const store = new UpdateDialogStore<Entity.User>()
export default store as Store<Entity.User>
export const api: API<Entity.User> = store