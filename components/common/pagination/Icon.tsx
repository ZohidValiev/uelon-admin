
import { FC } from "react"
import { Icon as _Icon } from "@/components/common/icon"
import styles from "@/styles/Pagination.module.css"

interface Props {
    id: string
    title?: string
}

const Icon: FC<Props> = ({ id, title }) => {

    return (
        <_Icon 
            className={styles.pagination__icon} 
            icon={id} 
            title={title}
        />
    )
}

export default Icon