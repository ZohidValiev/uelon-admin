
import { useCallback } from "react"
import * as users from "@/types/users"
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { observer } from "mobx-react"
import { CreateForm } from "@/components/users/froms"
import store from "@/stores/users/UserCreateDialogStore"


function CreateUserDialog() {
    
    const handleSubmit = useCallback(async (data: users.DTO.CreateUser) => {
        store.createUser(data)
    }, [])

    if (!store.visible) {
        return null
    }

    const formId = "create-user-form"
    const buttons = [
        {
            type: "submit",
            form: formId,
            value: "Добавить",
            disabled: store.submited,
        },
        {
            value: "Закрыть",
            disabled: store.submited,
            onClick() {
                store.close()
            }
        }
    ]

    return (
        <Portal>
            <Dialog 
                title="Добавить пользователя" 
                loading={store.submited} 
                buttons={buttons}
            >
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