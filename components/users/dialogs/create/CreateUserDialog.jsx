
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { observer } from "mobx-react"
import { CreateForm } from "@/components/users/froms"
import store from "./store"


function CreateUserDialog() {
    
    if (!store.visible) {
        return null
    }

    const handleSubmit = async (fields) => {
        store.createUser(fields)
    }

    const formId = "create-user-form"
    const buttons = [
        {
            type: "submit",
            form: formId,
            value: "Добавить",
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
            <Dialog title="Добавить пользователя" loading={true} buttons={buttons}>
                <CreateForm 
                    id={formId}
                    horizontal={true}
                    disabled={store.submited}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </Portal>
    )
}

export default observer(CreateUserDialog)