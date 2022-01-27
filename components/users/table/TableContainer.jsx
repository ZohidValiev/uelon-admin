
import { useState, useCallback, useEffect } from "react"
import { useUsers } from "@/hooks/users"
import useEM from "@/hooks/event-manager"
import { _message } from "@/components/message"
import { _info } from "@/components/info-dialog"
import Table from "./Table"
import { PaginationBlock, Pagination } from "@/components/pagination"


function TableContainer() {

    const ITEMS_COUNT = 5//20

    const [state, setState] = useState(() => ({
        prevPage: 1,
        page: 1,
    }))

    const handleChangePage = useCallback((pageNumber) => {
        setState({
            prevPage: state.page,
            page: pageNumber,
        })
    }, [state])

    const { items:users, totalItems, isLoading, error, mutate } = useUsers(state.page, {
        onSuccess:() => {
            _message.close()
        }
    })

    const em = useEM()
    useEffect(() => {
        em.on("users:created", (user) => {
            if (state.page == 1) {
                mutate()
                _message.open("Ждите, идет обновление...")
            } else {
                _info.openInfo("Уведомление", `Пользователь "${user.nickname}" успешно добавлен.`)
            }
        })

        return () => {
            em.off("users:created")
        }
    }, [users, state, mutate, em])

    if (error) {
        return "Error"
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