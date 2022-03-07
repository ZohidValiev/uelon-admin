
import { FC } from "react"
import { Layout } from '@/components/common/layout'
import { MenuContainer } from "@/components/common/menu"
import styles from '@/styles/Page.module.css'


interface Props {
    title: string
}

const Page: FC<Props> = ({ title, children }) => {
    return (
        <Layout>
            <div className={styles.page}>
                <div className={styles.page__header}>
                    <h1 className={styles.page__title}>
                        {title}
                    </h1>
                    <MenuContainer />
                </div>
                <div className={styles.page__main}>
                    {children}
                </div>
            </div>
        </Layout>
    )
}

export default Page