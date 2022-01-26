
import { ToolBar, AddToolButton } from "@/components/tool"


function UserToolBar({ onClickAdd }) {

    return (
        <ToolBar>
            <AddToolButton onClick={onClickAdd}>
                Добавить
            </AddToolButton>
        </ToolBar>
    )
}

export default UserToolBar