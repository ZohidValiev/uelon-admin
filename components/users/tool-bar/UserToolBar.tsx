
import { FC, useCallback } from "react"
import { useEventManager } from "@/utils/event-manager"
import { ToolBar, AddToolButton } from "@/components/common/tool"
import { _createUserDialog } from "@/components/users/dialogs/create"
import eventsBus from "@/events-bus"


const UserToolBar: FC = () => {

    const handleClickAdd = useCallback(() => {
        _createUserDialog.open({
            onOK(user) {
                eventsBus.userCreated.broadcast(user)
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