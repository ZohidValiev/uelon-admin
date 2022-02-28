
import { FC } from "react"
import styles from "@/styles/Tool.module.css"

interface Props {
}

const ToolBar: FC<Props> = ({ children }) => {
    return (
        <div className={styles.toolbar}>
            {children}
        </div>
    )
}

export default ToolBar