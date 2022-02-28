
import { useState, useCallback, useEffect, FC } from "react"
import { UserEvent, createEventAlias } from "@/events"
import { useUsers } from "@/hooks/users"
import { useEventManager } from "@/utils/event-manager"
import { _info } from "@/components/common/info-dialog"
import { _infoLoader } from "@/components/common/loaders/info-loader"
import Table from "./Table"
import { PaginationBlock, Pagination } from "@/components/common/pagination"
import { TableSpinner } from "@/components/common/spinners/table"


interface State {
    prevPage: number
    page: number
}

const TableContainer: FC = () => {

    const ITEMS_COUNT = 5//20

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

    const em = useEventManager()
    useEffect(() => {
        const EVENT_USER_CREATED__TABLE = createEventAlias(UserEvent.USER_CREATED, "table")
        
        em.on(EVENT_USER_CREATED__TABLE, (user) => {
            _info.openInfo("Уведомление", `Пользователь "${user.nickname}" успешно добавлен.`)

            if (state.page == 1) {
                mutate()
            }
        })

        return () => {
            em.off(EVENT_USER_CREATED__TABLE)
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
            <Table users={users} page={_page} totalItemsCount={ITEMS_COUNT} />
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