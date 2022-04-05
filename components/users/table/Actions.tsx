
import { Entity } from "@/types/users"
import { FC, MouseEventHandler, useCallback, useContext } from "react"
import ActionIcon from "./ActionIcon"
import { Value, UserActionsContext } from "./context"

interface Props {
    user: Entity.User
    // onUpdate: MouseEventHandler<SVGSVGElement>
    // onRemove: MouseEventHandler<SVGSVGElement>
}

const Actions: FC<Props> = ({ user }) => {

    const context = useContext<Value>(UserActionsContext)

    const handleUpdate = useCallback(() => {
        context.handleUpdate(user)
    }, [user])

    const handleRemove = useCallback(() => {
        context.handleRemove(user)
    }, [user])

    return (
        <div className="icon-action">
            <ActionIcon 
                title="Редактировать"
                icon="pencil"
                onClick={handleUpdate}
            />
            <ActionIcon 
                title="Удалить"
                icon="trash"
                onClick={handleRemove}
            />
        </div>
    )
}

export default Actions