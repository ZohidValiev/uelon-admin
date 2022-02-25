
import { useCallback } from "react"
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { observer } from "mobx-react"
import { ChangeNicknameForm } from "@/components/users/froms"
import store from "./store"


const ChangeNicknameDialog = observer(() => {
    
    const handleSubmit = useCallback(async (nickname: string) => {
        store.update(nickname)
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
                    value={store.getUserNickname()}
                    disabled={store.submited}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </Portal>
    )
})

export default ChangeNicknameDialog