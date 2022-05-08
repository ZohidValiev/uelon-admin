
import { FC, useCallback } from "react"
import { ToolBar, AddToolButton } from "@/components/common/tool"
import { _categoryCUDialog } from "@/components/categories/dialogs/cu-dialog"
import events from "@/events-bus"


const CategoryToolBar: FC = () => {

    const handleClickAdd = useCallback(() => {
        _categoryCUDialog.openCreate({
            onOK(id) {
                events.categoryCreated.broadcast(id)
            },
            onError(error) {

            }
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

export default CategoryToolBar