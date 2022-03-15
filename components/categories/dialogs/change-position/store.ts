
import ChangePositionDialogStore, { Store, API as _API } from "@/stores/categories/ChangePositionDialogStore"
// import { Store, API as _API } from "@/types/categories/change-position-dialog"


const store = new ChangePositionDialogStore()
export default store as Store
export const api: API = store
export type API = _API