
import UpdateDialogStore, { API, Store } from "@/stores/UpdateDialogStore"
import { Entity, Roles } from "@/types/users"


const store = new UpdateDialogStore<Entity.User, Roles>()
export default store as Store<Entity.User, Roles>
export const api: API<Entity.User, Roles> = store