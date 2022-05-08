
import { FC } from "react"
import { Loader } from "@/components/common/loaders/loader"
import styles from "@/styles/PageLoader.module.css"

type Props = {
    // size?: number
    status?: string
}

const PageLoader: FC<Props> = ({ /*size=48,*/ status="загрузка" }) => {
    return (
        <div className={styles.pageLoader}>
            <div className={styles.pageLoader__content}>
                <div className={styles.pageLoader__loader}>
                    <Loader size={32}/>
                </div>
                <span className={styles.pageLoader__status}>
                    {status}
                </span>
            </div>
        </div>
    )
}

export default PageLoader