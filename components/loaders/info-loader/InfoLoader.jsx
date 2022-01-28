
import { observer } from "mobx-react"
import { Portal } from "@/components/hoc"
import store from "./store"
import styles from "@/styles/InfoLoader.module.css"

function InfoLoader() {

    if (!store.visible) {
        return null
    }

    return (
        <Portal>
            <div className={styles.infoLoader}>
                загрузка...
            </div>
        </Portal>
    )
}

export default observer(InfoLoader)