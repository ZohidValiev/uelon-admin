
import { FC, MouseEventHandler, memo, ReactElement } from "react"
import IconAction from "./IconAction"
import styles from "@/styles/ViewGrid.module.css"

interface Props {
    title: string
    value: number | string | ReactElement
    onClick: MouseEventHandler
}

const UserViewItem: FC<Props> = ({ title, value, onClick }) => {

    return (
        <>
            <div className={styles.viewGrid__name}>
                { title }
            </div>
            <div className={styles.viewGrid__value}>
                { value }
                { onClick && <IconAction onClick={onClick} /> }
            </div>
        </>
    )
}

export default memo(UserViewItem)