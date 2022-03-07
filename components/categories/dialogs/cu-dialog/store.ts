
import CUDialogStore from "@/stores/categories/CUDialogStore"
import { API, Store } from "@/types/categories/cu-dialog"


const store = new CUDialogStore()
export default store as Store
export const api: API = store