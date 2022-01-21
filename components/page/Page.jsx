
import Layout from '@/components/layout'
import styles from '@/styles/Page.module.css'

function Page({ title, children }) {
    return (
        <Layout>
            <div className={styles.page}>
                <h1 className={styles.page__title}>
                    <div className={styles.page__titleContent}>{title}</div>
                </h1>
                <div className={styles.page__main}>
                    {children}
                </div>
            </div>
        </Layout>
    )
}

export default Page