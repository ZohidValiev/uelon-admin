
import styles from "@/styles/Layout.module.css"

function Layout({header, children, footer})
{
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