
import { FC, useCallback } from "react"
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/common/dialog"
import { observer } from "mobx-react"
import { ChangeStatusForm } from "@/components/users/froms"
import store from "./store"
import { Status } from "@/types/users"
import * as api from "@/api/users"


const ChangeStatusDialog: FC = () => {
    
    const handleSubmit = useCallback(async (status: Status) => {
        store.send(async (user) => {
            const id = await api.updateUserStatus(user.id, status)

            return {
                id,
                data: status,
            }
        })
    }, [])

    if (!store.visible) {
        return null
    }

    const formId = "change-status-form"
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
                <ChangeStatusForm 
                    id={formId}
                    value={store.entity.status}
                    disabled={store.submited}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </Portal>
    )
}

export default observer(ChangeStatusDialog)