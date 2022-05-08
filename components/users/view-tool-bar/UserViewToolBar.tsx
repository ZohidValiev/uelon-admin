
import { FC, useCallback } from "react"
import { ToolBar, DeleteToolButton, UpdateToolButton } from "@/components/common/tool"
import { Entity } from "@/types/users"
import events from "@/events-bus"
import { _confirm } from "@/components/common/confirm-dialog"
import { _message } from "@/components/common/message"
import { _info } from "@/components/common/info-dialog"
import * as api from "@/api/users"

interface Props {
    user: Entity.User
}

const UserViewToolBar: FC<Props> = ({ user }) => {

    const handleDelete = useCallback(() => {
        _confirm.open("Удалить пользователя?", {
            async onOK() {
                _message.open("Ждите, идет удаление пользователя...")
                try {
                    await api.remove(user.id)
                } catch (error) {
                    _info.openError("Ошибка", "Во время выполнения действия произошла ошибка.")
                    return
                } finally {
                    _message.close()
                }

                events.userDeleted.broadcast(user.id)
            }
        })
    }, [user])

    return (
        <ToolBar>
            <DeleteToolButton onClick={handleDelete}>
                Удалить
            </DeleteToolButton>
        </ToolBar>
    )
}

export default UserViewToolBar