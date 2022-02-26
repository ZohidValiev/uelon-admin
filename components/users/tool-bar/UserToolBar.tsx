
import { FC, useCallback } from "react"
import { useEventManager } from "@/utils/event-manager"
import { UserEvent } from "@/events"
import { ToolBar, AddToolButton } from "@/components/tool"
import { _createUserDialog } from "@/components/users/dialogs/create"


const UserToolBar: FC = () => {

    const em = useEventManager()

    const handleClickAdd = useCallback(() => {
        _createUserDialog.open({
            onOK(user) {
                em.trigger(UserEvent.USER_CREATED, user)
            },
            onError(error) {
                console.error("onError: ", error)
            },
        })
    }, [])

    return (
        <ToolBar>
            <AddToolButton onClick={handleClickAdd}>
                Добавить
            </AddToolButton>
        </ToolBar>
    )
}

export default UserToolBar