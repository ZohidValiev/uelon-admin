
import { useCallback, useEffect } from "react"
import  * as api from "@/api/categories"
import { _message } from "@/components/common/message"
import Table from "./Table"
import { _confirm } from "@/components/common/confirm-dialog"
import { _info } from "@/components/common/info-dialog"
import { _changePositionDialog } from "@/components/categories/dialogs/change-position"
import { _categoryCUDialog } from "@/components/categories/dialogs/cu-dialog"
import { useEventManager } from "@/utils/event-manager"
import { CategoryEvent, createEventAlias } from "@/events"


function TableContainer({ categories, mutate }) {
    const MESSAGE_UPDATE = "Ждите, идет обновление категорий..."

    const em = useEventManager()
    useEffect(() => {
        const EVENT_CATEGORY_CREATED__TABLE = createEventAlias(CategoryEvent.CATEGORY_CREATED, "table")
        em.on(EVENT_CATEGORY_CREATED__TABLE, (category) => {
            mutate([...categories, category])
        })

        return () => {
            em.off(EVENT_CATEGORY_CREATED__TABLE)
        }
    }, [categories])

    const handlePositionUp = useCallback((category) => {
        _changePositionDialog.openUp(
            category, 
            { 
                categoriesLength: categories.length 
            }, 
            {
                onOK(category) {
                    mutate()
                    _message.open(MESSAGE_UPDATE)
                }
            }
        )
    }, [mutate, categories])

    const handlePositionDown = useCallback((category) => {
        _changePositionDialog.openDown(
            category,
            {
                categoriesLength: categories.length,
            },
            {
                onOK() {
                    mutate()
                    _message.open(MESSAGE_UPDATE)        
                }
            }
        )
    }, [mutate, categories])

    const handleUpdate = useCallback((category) => {
        _categoryCUDialog.openUpdate(category, {
            onOK(category) {
                mutate(() => {
                    return categories.map((_category) => {
                        return _category.id === category.id ? category : _category
                    })
                })
            }
        })
    }, [categories])

    const handleDelete = useCallback((category) => {
        _confirm.open("Удалить категорию?", {
            async onOK() {
                _message.open("Ждите, идет удаление категории...")
                try {
                    await api.remove(category.id)
                } catch (error) {
                    _message.close()
                    _info.openError("Ошибка", "Во время выполнения действия произошла ошибка.")
                    return
                }
                _message.open(MESSAGE_UPDATE)
                mutate()
            }
        })
    }, [categories])

    return (
        <Table 
            categories={categories} 
            onUpdate={handleUpdate}
            onUp={handlePositionUp}
            onDown={handlePositionDown}
            onDelete={handleDelete}
        />
    )
}

export default TableContainer