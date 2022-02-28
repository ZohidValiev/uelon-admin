
import { FC } from "react"
import { Layout } from '@/components/common/layout'
import styles from '@/styles/Page.module.css'


interface Props {
    title: string
}

const Page: FC<Props> = ({ title, children }) => {
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