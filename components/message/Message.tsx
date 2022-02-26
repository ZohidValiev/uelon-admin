
import { FC } from "react"
import { Portal } from "@/components/hoc"
import store from "./store"
import styles from "@/styles/Message.module.css"

const Message: FC = () => {

    if (!store.visible) {
        return null
    }

    return (
        <Portal>
            <div className={styles.messageOverlay}>
                <div className={styles.message}>{store.getMessage()}</div>
            </div>
        </Portal>
    )
}

export default Message