
import { Icon as _Icon } from "@/components/icon"
import styles from "@/styles/Pagination.module.css"

function Icon({ id, title }) {

    return (
        <_Icon 
            className={styles.pagination__icon} 
            icon={id} 
            title={title}
        />
    )
}

export default Icon