
import { FC } from "react"
import { observer } from "mobx-react"
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/common/dialog"
import store from "@/stores/ConfirmDialogStore"
import styles from "@/styles/Dialog.module.css"

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
            <Dialog 
                title="Подтвердите" 
                className={styles.dialog_confirm}
                contentClassName={styles.dialog__content_center}
                buttons={buttons}
            >
                {store.content}
            </Dialog>
        </Portal>
    )
}

export default observer(ConfirmDialog)