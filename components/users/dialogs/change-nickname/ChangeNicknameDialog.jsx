
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { observer } from "mobx-react"
import { ChangeNicknameForm } from "@/components/users/froms"
import store from "./store"


const ChangeNicknameDialog = observer(() => {
    
    if (!store.visible) {
        return null
    }

    const handleSubmit = async (nickname) => {
        store.update(nickname)
    }

    const formId = "change-nickname-form"
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
                <ChangeNicknameForm 
                    id={formId}
                    value={store.user.nickname}
                    disabled={store.submited}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </Portal>
    )
})

export default ChangeNicknameDialog