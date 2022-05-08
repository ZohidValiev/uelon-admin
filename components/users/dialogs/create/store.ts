
import CreateDialogStore, { Store, API } from "@/stores/CreateDialogStore"

const store = new CreateDialogStore<number>()

export default store as Store<number>
export const api: API<number> = store