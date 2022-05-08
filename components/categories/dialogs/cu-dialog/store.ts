
import CUDialogStore, { Store, API } from "@/stores/categories/CUDialogStore"


const store = new CUDialogStore()
export default store as Store
export const api: API = store