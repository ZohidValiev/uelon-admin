
import { FC, useCallback, useEffect } from "react"
import * as api from "@/api/categories"
import { Entity } from "@/types/categories"
import { _message } from "@/components/common/message"
import { TableSpinner } from "@/components/common/spinners/table"
import Table from "./Table"
import { _confirm } from "@/components/common/confirm-dialog"
import { _info } from "@/components/common/info-dialog"
import { _changePositionDialog } from "@/components/categories/dialogs/change-position"
import { _categoryCUDialog } from "@/components/categories/dialogs/cu-dialog"
import events from "@/events-bus"


interface Props {
    categories: Entity.Category[]
    mutate: any
    isLoading: boolean
}

const TableContainer: FC<Props> = ({ categories, mutate, isLoading }) => {
    const MESSAGE_UPDATE = "Ждите, идет обновление категорий..."

    useEffect(() => {
        return events.categoryCreated.subscribe((id) => {
            mutate()
        })
    }, [mutate])

    const handlePositionUp = useCallback((category) => {
        _changePositionDialog.openUp(
            category, 
            { 
                categoriesLength: categories.length 
            }, 
            {
                async onOK(id) {
                    _message.open(MESSAGE_UPDATE)
                    try {
                        await mutate()
                    } finally {
                        _message.close()
                    }
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
                async onOK(id) {
                    _message.open(MESSAGE_UPDATE)
                    try {
                        await mutate()
                    } finally {
                        _message.close()
                    }
                }
            }
        )
    }, [mutate, categories])

    const handleUpdate = useCallback((category) => {
        _categoryCUDialog.openUpdate(category, {
            async onOK(id) {
                const category = await api.loadCategory(id)
                mutate(categories.map((_category) => {
                    return _category.id === category.id ? category : _category
                }), false)
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
                    _info.openError("Ошибка", "Во время выполнения действия произошла ошибка.")
                    return
                } finally {
                    _message.close()
                }

                _message.open(MESSAGE_UPDATE)
                try {
                    await mutate()
                } finally {
                    _message.close()
                }
            }
        })
    }, [categories])

    return (
        <>
            { isLoading && (
                <TableSpinner 
                    columns={7} 
                    rows={10} 
                /> 
            ) }
            { !isLoading && (
                <Table 
                    categories={categories} 
                    onUpdate={handleUpdate}
                    onUp={handlePositionUp}
                    onDown={handlePositionDown}
                    onDelete={handleDelete}
                />
            ) }
        </>
    )
}

export default TableContainer