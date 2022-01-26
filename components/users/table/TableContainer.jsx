
import { useState, useCallback } from "react"
import { useUsers } from "@/hooks/users"
import Table from "./Table"
import { PaginationBlock, Pagination } from "@/components/pagination"


// let prevPage = 1
// const ITEMS_COUNT = 20

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

    const { items, totalItems, isLoading, error } = useUsers(state.page)

    if (error) {
        return "Error"
    }

    const _page = isLoading ? state.prevPage : state.page

    return (
        <>
            <Table users={items} page={_page} itemsCount={ITEMS_COUNT} />
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