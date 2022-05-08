
import UpdateDialogStore, { API, Store } from "@/stores/UpdateDialogStore"
import { Entity } from "@/types/users"


const store = new UpdateDialogStore<Entity.User, string>()
export default store as Store<Entity.User, string>
export const api: API<Entity.User, string> = store