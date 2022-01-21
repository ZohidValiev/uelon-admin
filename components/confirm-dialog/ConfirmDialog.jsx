
import { observer } from "mobx-react"
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import store from "./store"

function ConfirmDialog() {

    if (!store.visible) {
        return null
    }

    const buttons = [
        {
            value: "Да",
            onClick: () => {
                store.onOk()
                store.close()
            },
        },
        {
            value: "Нет",
            onClick: () => {
                store.onCancel && store.onCancel()
                store.close()
            },
        },
    ]

    return (
        <Portal>
            <Dialog title="Подтвердите" buttons={buttons}>
                {store.content}
            </Dialog>
        </Portal>
    )
}

export default observer(ConfirmDialog)