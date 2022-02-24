
import useEM from "@/hooks/event-manager"
import { ToolBar, AddToolButton } from "@/components/tool"
import { _createUserDialog } from "@/components/users/dialogs/create"


function UserToolBar() {

    const em = useEM()

    const handleClickAdd = () => {
        _createUserDialog.open({
            onOK(user) {
                em.trigger("users:created", user)
            },
            onError(error) {
                console.error("onError: ", error)
            },
        })
    }

    return (
        <ToolBar>
            <AddToolButton onClick={handleClickAdd}>
                Добавить
            </AddToolButton>
        </ToolBar>
    )
}

export default UserToolBar