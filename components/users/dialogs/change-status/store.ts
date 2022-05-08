
import UpdateDialogStore, { API, Store } from "@/stores/UpdateDialogStore"
import { Entity, Status } from "@/types/users"


const store = new UpdateDialogStore<Entity.User, Status>()
export default store as Store<Entity.User, Status>
export const api: API<Entity.User, Status> = store
