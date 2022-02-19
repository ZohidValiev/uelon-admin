
import { FC } from "react"
import styles from "@/styles/Panel.module.css"

type Props = {
    title: string
    shadow?: boolean
}

const Panel: FC<Props> = ({ title, shadow=false, children }) => {

    const classes = [
        styles.panel,
        shadow ? styles.panel_boxShadow : ""
    ]

    return (
        <div className={classes.join(" ")}>
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