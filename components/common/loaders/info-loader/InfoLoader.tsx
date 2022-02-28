
import { FC } from "react"
import { observer } from "mobx-react"
import { Portal } from "@/components/hoc"
import { Loader } from "@/components/loaders/loader"
import store from "@/stores/InfoLoaderStore"
import styles from "@/styles/InfoLoader.module.css"

const InfoLoader: FC = () => {

    if (!store.visible) {
        return null
    }

    return (
        <Portal>
            <div className={styles.infoLoader}>
                <Loader size={24} />
                <span className={styles.infoLoader__message}>загрузка...</span>
            </div>
        </Portal>
    )
}

export default observer(InfoLoader)