
import styles from "@/styles/Pagination.module.css"

function PaginationBlock({ children }) {

    return (
        <div className={styles.paginationBlock}>
            { children }
        </div>
    )
}

export default PaginationBlock