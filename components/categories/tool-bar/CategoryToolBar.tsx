
import { FC, useCallback } from "react"
import { useEventManager } from "@/utils/event-manager"
import { ToolBar, AddToolButton } from "@/components/common/tool"
import { _categoryCUDialog } from "@/components/categories/dialogs/cu-dialog"
import { CategoryEvent } from "@/events"


const CategoryToolBar: FC = () => {

    const em = useEventManager()

    const handleClickAdd = useCallback(() => {
        _categoryCUDialog.openCreate({
            onOK(category) {
                em.trigger(CategoryEvent.CATEGORY_CREATED, category)
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