
import { Loader } from "@/components/loaders/loader"
import styles from "@/styles/PageLoader.module.css"


function PageLoader() {
    return (
        <div className={styles.pageLoader}>
            <Loader size={48}/>
        </div>
    )
}

export default PageLoader