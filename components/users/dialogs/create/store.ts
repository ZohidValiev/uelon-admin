
import { Entity } from "@/types/users"
// import { Store, API } from "@/types/create-dialog"
import CreateDialogStore, { Store, API } from "@/stores/CreateDialogStore"

const store = new CreateDialogStore<Entity.User>()
export default store as Store<Entity.User>
export const api: API<Entity.User> = store
