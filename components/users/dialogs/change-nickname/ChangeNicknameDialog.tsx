
import { useCallback } from "react"
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { observer } from "mobx-react"
import * as api from "@/api/users"
import { ChangeNicknameForm } from "@/components/users/froms"
import store from "./store"


const ChangeNicknameDialog = observer(() => {
    
    const handleSubmit = useCallback(async (nickname: string) => {
        store.send(async (user) => {
            return api.updateUserNickname(user.id, nickname)
        })
    }, [])

    if (!store.visible) {
        return null
    }

    const formId = "change-nickname-form"
    const buttons = [
        {
            type: "submit",
            form: formId,
            value: "Изменить",
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
                <ChangeNicknameForm 
                    id={formId}
                    value={store.entity.nickname}
                    disabled={store.submited}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </Portal>
    )
})

export default ChangeNicknameDialog