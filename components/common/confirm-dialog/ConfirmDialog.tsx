
import { FC } from "react"
import { observer } from "mobx-react"
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import store from "@/stores/ConfirmDialogStore"

const ConfirmDialog: FC = () => {

    if (!store.visible) {
        return null
    }

    const buttons = [
        {
            value: "Да",
            onClick: () => {
                store.onOK()
            },
        },
        {
            value: "Нет",
            onClick: () => {
                store.onCancel()
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