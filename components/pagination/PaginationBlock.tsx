
import { FC } from "react"
import styles from "@/styles/Pagination.module.css"

const PaginationBlock: FC = ({ children }) => {

    return (
        <div className={styles.paginationBlock}>
            { children }
        </div>
    )
}

export default PaginationBlock