
import { FC, useCallback } from "react"
import { ToolBar, DeleteToolButton, UpdateToolButton } from "@/components/common/tool"
import { Entity } from "@/types/categories"
import { _categoryCUDialog } from "@/components/categories/dialogs/cu-dialog"
import events from "@/events-bus"
import { _confirm } from "@/components/common/confirm-dialog"
import { _message } from "@/components/common/message"
import { _info } from "@/components/common/info-dialog"
import * as api from "@/api/categories"

interface Props {
    category: Entity.Category
}

const CategoryToolBar: FC<Props> = ({ category }) => {

    const handleUpdate = useCallback(() => {
        _categoryCUDialog.openUpdate(category, {
            onOK(id) {
                events.categoryUpdated.broadcast(id)
            },
            onError(error) {
            }
        })
    }, [category])
    
    const handleDelete = useCallback(() => {
        _confirm.open("Удалить категорию?", {
            async onOK() {
                _message.open("Ждите, идет удаление категории...")
                try {
                    await api.remove(category.id)
                } catch (error) {
                    _info.openError("Ошибка", "Во время выполнения действия произошла ошибка.")
                    return
                } finally {
                    _message.close()
                }

                events.categoryDeleted.broadcast(category.id)
            }
        })
    }, [category])

    return (
        <ToolBar>
            <UpdateToolButton onClick={handleUpdate}>
                Редактировать
            </UpdateToolButton>
            <DeleteToolButton onClick={handleDelete}>
                Удалить
            </DeleteToolButton>
        </ToolBar>
    )
}

export default CategoryToolBar