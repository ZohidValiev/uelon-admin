
import { observer } from "mobx-react"
import { Portal } from "@/components/hoc"
import { Loader } from "@/components/loaders/loader"
import store from "./store"
import styles from "@/styles/InfoLoader.module.css"

function InfoLoader() {

    if (!store.visible) {
        return null
    }

    return (
        <Portal>
            <div className={styles.infoLoader}>
                <Loader />
                <span className={styles.infoLoader__message}>загрузка...</span>
            </div>
        </Portal>
    )
}

export default observer(InfoLoader)