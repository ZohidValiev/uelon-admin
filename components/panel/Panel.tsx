
import { FC } from "react"
import styles from "@/styles/Panel.module.css"

type Props = {
    title: string
}

const Panel: FC<Props> = ({ title, children }) => {

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