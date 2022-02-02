
import styles from "@/styles/Panel.module.css"

function Panel({ title, type, children }) {

    return (
        <div className={styles.panel}>
            <div className={styles.panel__title}>
                { title }
            </div>
            <div className={styles.panel__body}>
                { children }
            </div>
        </div>
    )
}

export default Panel