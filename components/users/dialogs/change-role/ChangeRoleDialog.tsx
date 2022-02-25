
import { useCallback } from "react"
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { observer } from "mobx-react"
import { ChangeRoleForm } from "@/components/users/froms"
import store from "./store"
import { Roles } from "@/types/users"


function ChangeRoleDialog() {
    
    const handleSubmit = useCallback(async (role: Roles) => {
        store.update(role)
    }, [])

    if (!store.visible) {
        return null
    }

    const formId = "change-role-form"
    const buttons = [
        {
            type: "submit",
            form: formId,
            value: "Изменить",
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
                title="Изменить" 
                loading={store.submited}
                buttons={buttons}
            >
                <ChangeRoleForm 
                    id={formId}
                    value={store.getUserRole()}
                    disabled={store.submited}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </Portal>
    )
}

export default observer(ChangeRoleDialog)
