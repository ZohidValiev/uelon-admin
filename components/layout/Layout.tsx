
import { FC, ReactElement } from "react"
import Header from "./Header"
import styles from "@/styles/Layout.module.css"

interface Props {
    footer?: ReactElement
}

const Layout: FC<Props> = ({ children, footer}) => {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <footer>{footer}</footer>
        </div>
    )
}

export default Layout