
import { useCallback } from "react"
import  * as api from "@/api/categories"
import { useEventManager } from "../hoc"
import { _message } from "@/components/message"
import Table from "./Table"
import { _confirm } from "@/components/confirm-dialog"
import { _info } from "@/components/info-dialog"
import { _categoryDialog, _changePositionDialog } from "@/components/categories-dialog"

function TableContainer({ categories, mutate }) {

    const em = useEventManager()

    const positionUpHandler = useCallback((category) => {
        _changePositionDialog.openUp(
            {
                category,
                categoriesLength: categories.length,
            },
            {
                onOk() {
                    mutate()
                    _message.open("Ждите, идет обновление категорий...")        
                }
            }
        )
    }, [mutate, categories])

    const positionDownHandler = useCallback((category) => {
        _changePositionDialog.openDown(
            {
                category,
                categoriesLength: categories.length,
            },
            {
                onOk() {
                    mutate()
                    _message.open("Ждите, идет обновление категорий...")        
                }
            }
        )
    }, [mutate, categories])

    const updateHandler = useCallback((category) => {
        _categoryDialog.openUpdate({
            async endpoint(data) {
                return await api.update(category.id, data)
            },
            getData() {
                return {
                    titleUz: category.translations.UZ.title,
                    titleRu: category.translations.RU.title,
                    icon: category.icon,
                    isActive: category.isActive ? 1 : 0,
                }
            },
            onOk(category) {
                mutate(() => {
                    return categories.map((_category) => {
                        return _category.id === category.id ? category : _category
                    })
                })
            },
            onError(error) {
                _info.openError("Ошибка", error)
            },
        })
    }, [categories])

    const deleteHandler = useCallback((category) => {
        _confirm.open("Удалить категорию?", {
            async onOk() {
                _message.open("Ждите, идет удаление категории...")
                try {
                    await api.remove(category.id)
                } catch (error) {
                    _message.close()
                    _info.openError("Ошибка", error +  " Во время выполнения действия произошла ошибка.")
                    return
                }
                _message.open("Ждите, идет обновление категорий...")
                mutate()
            }
        })
    }, [mutate, categories])

    return (
        <Table 
            categories={categories} 
            onUpdate={updateHandler}
            onUp={positionUpHandler}
            onDown={positionDownHandler}
            onDelete={deleteHandler}
        />
    )
}

export default TableContainer