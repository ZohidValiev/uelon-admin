
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { observer } from "mobx-react"
import { ChangeStatusForm } from "@/components/users/froms"
import store from "./store"


function ChangeStatusDialog() {
    
    if (!store.visible) {
        return null
    }

    const handleSubmit = async (status) => {
        store.update(status)
    }

    const formId = "change-status-form"
    const buttons = [
        {
            type: "submit",
            form: formId,
            value: "Измнеить",
            className: store.submited ? "button_is-loading" : "",
            disabled: store.submited,
        },
        {
            value: "Зактрыть",
            disabled: store.submited,
            onClick() {
                store.close()
            }
        }
    ]

    return (
        <Portal>
            <Dialog title="Изменить" buttons={buttons}>
                <ChangeStatusForm 
                    id={formId}
                    value={store.user.status}
                    disabled={store.submited}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </Portal>
    )
}

export default observer(ChangeStatusDialog)