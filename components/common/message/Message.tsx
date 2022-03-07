
import { FC } from "react"
import { observer } from "mobx-react"
import { Portal } from "@/components/hoc"
import { Loader } from "@/components/common/loaders/loader"
import store from "@/stores/MessageStore"
import styles from "@/styles/Message.module.css"

const Message: FC = () => {

    if (!store.visible) {
        return null
    }

    return (
        <Portal>
            <div className={styles.messageOverlay}>
                <div className={styles.message}>
                    <Loader 
                        size={24} 
                        className={styles.message__spinner}
                    />
                    <div className={styles.message__content}>
                        {store.getMessage()}
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default observer(Message)