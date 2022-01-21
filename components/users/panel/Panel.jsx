
import { useState, useCallback } from "react"
import { useUsers } from "@/api/users-hook"
import { Table } from "@/components/users/table"
import { PaginationBlock, Pagination } from "@/components/pagination"
import styles from "@/styles/Panel.module.css"


let prevPage = 1
const ITEMS_COUNT = 20

function Panel() {

    const [page, setPage] = useState(1)
    const { items, isLoading, error, totalItems } = useUsers(page)

    if (error) {
        return "error: " + error
    }

    const handleChangePage = useCallback((pageNumber) => {
        prevPage = page
        setPage(pageNumber)
    }, [page])

    const _page = isLoading ? prevPage : page
    
    return (
        <div className={styles.panel}>
            <Table users={items} page={_page} itemsCount={ITEMS_COUNT} />
            { totalItems <= ITEMS_COUNT
                ? null
                : <PaginationBlock>
                    <Pagination 
                        activePage={page}
                        itemsCountPerPage={ITEMS_COUNT}
                        totalItemsCount={totalItems}
                        pageRangeDisplayed={10}
                        onChange={handleChangePage}
                    />
                  </PaginationBlock>
            }
        </div>
    )
}

export default Panel