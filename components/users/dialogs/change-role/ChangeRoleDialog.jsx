
import { getUserRole } from "@/utils/functions"
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { observer } from "mobx-react"
import { ChangeRoleForm } from "@/components/users/froms"
import store from "./store"


function ChangeRoleDialog() {
    
    if (!store.visible) {
        return null
    }

    const handleSubmit = async (role) => {
        store.update(role)
    }

    const formId = "change-role-form"
    const buttons = [
        {
            type: "submit",
            form: formId,
            value: "Измнеить",
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
            <Dialog 
                title="Изменить" 
                loading={store.submited}
                buttons={buttons}
            >
                <ChangeRoleForm 
                    id={formId}
                    value={getUserRole(store.user.roles)}
                    disabled={store.submited}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </Portal>
    )
}

export default observer(ChangeRoleDialog)
