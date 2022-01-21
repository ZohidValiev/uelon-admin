
import styles from '../../styles/Layout.module.css'

function Layout({header, children, footer})
{
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>

            <footer className={styles.footer}>
                <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                >
                Powered by{' '}
                <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    )
}

export default Layout