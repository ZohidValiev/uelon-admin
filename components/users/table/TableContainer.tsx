
import { useState, useCallback, useEffect, FC } from "react"
import { UserEvent, createEventAlias } from "@/events"
import { useUsers } from "@/hooks/users"
import { useEventManager } from "@/utils/event-manager"
import { _info } from "@/components/common/info-dialog"
import { _infoLoader } from "@/components/common/loaders/info-loader"
import Table from "./Table"
import { PaginationBlock, Pagination } from "@/components/common/pagination"
import { TableSpinner } from "@/components/common/spinners/table"
import * as api from "@/api/users"
import { _confirm } from "@/components/common/confirm-dialog"
import { _message } from "@/components/common/message"
import { Entity } from "@/types/users"
import { UserActionsContext, Value } from "./context"
import { useRouter } from "next/router"
import eventsBus from "@/events-bus"

interface State {
    prevPage: number
    page: number
}

const TableContainer: FC = () => {

    const ITEMS_COUNT = 20

    const [state, setState] = useState<State>(() => ({
        prevPage: 1,
        page: 1,
    }))

    const handleChangePage = useCallback((pageNumber: number) => {
        setState({
            prevPage: state.page,
            page: pageNumber,
        })
    }, [state])

    const { 
        items:users, 
        totalItems, 
        isLoading, 
        isLagging, 
        error, 
        mutate,
    } = useUsers(state.page)

    const router = useRouter()
    const handleUpdate = useCallback((user: Entity.User) => {
        router.push(`/users/update/${user.id}`)
    }, [router])

    const handleRemove = useCallback(async (user: Entity.User) => {
        _confirm.open(`Вы действительно хотите удалить пользователя ${user.email}? `, {
            async onOK() {
                _message.open(`Ждите, идет удаление пользователя ${user.email}.`)
                try {
                    await api.remove(user.id)
                } catch (error) {
                    _info.openError("Ошибка", "Во время выполнения действия произошла ошибка.")
                    return
                } finally {
                    _message.close()
                }

                _message.open("Ждите, идет обновление пользователей")
                try {
                    await mutate()
                } finally {
                    _message.close()
                }
            }
        })
    }, [mutate])

    const [ contextValue ] = useState<Value>(() => ({
        handleUpdate,
        handleRemove,
    }))


    useEffect(() => {
        const unsubscribe = eventsBus.userCreated.subscribe((id) => {
            _info.openInfo("Уведомление", "Пользователь успешно добавлен.")
            mutate()
        })

        return () => {
            unsubscribe()
        }
    }, [state, mutate])

    useEffect(() => {
        if (isLoading) {
            _infoLoader.open()
        } else {
            _infoLoader.close()
        }
    }, [isLoading])

    if (error) {
        return (
            <>Error</>
        )
    }

    if (isLoading && !isLagging) {
        return (
            <TableSpinner columns={5} rows={ITEMS_COUNT} />
        )
    }

    const _page = isLoading ? state.prevPage : state.page
    
    return (
        <>
            <UserActionsContext.Provider value={contextValue}>
                <Table users={users} page={_page} totalItemsCount={ITEMS_COUNT} />
            </UserActionsContext.Provider>
            { totalItems <= ITEMS_COUNT
                ? null
                : <PaginationBlock>
                    <Pagination 
                        activePage={state.page}
                        itemsCountPerPage={ITEMS_COUNT}
                        totalItemsCount={totalItems}
                        pageRangeDisplayed={10}
                        onChange={handleChangePage}
                    />
                  </PaginationBlock>
            }
        </>
    )
}

export default TableContainer