
import { FC, ReactElement } from "react"
import styles from "@/styles/Layout.module.css"

interface Props {
    header?: ReactElement
    footer?: ReactElement
}

const Layout: FC<Props> = ({header, children, footer}) => {
    return (
        <div className={styles.container}>
            <header>{header}</header>
            <main className={styles.main}>
                {children}
            </main>
            <footer>{footer}</footer>
        </div>
    )
}

export default Layout