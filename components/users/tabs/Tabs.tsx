import { useRouter } from "next/router"
import styles from '@/styles/Tabs.module.css'
import TabLink from "./TabLink"

const LIST = "/users"
const UPDATE = "/users/update/[id]"
const VIEW = "/users/view/[id]"

function Tabs() {
    const router = useRouter()

    let tabLinkUpdateComp = null
    if (UPDATE === router.pathname) {
        tabLinkUpdateComp = (
            <TabLink 
                title="Редактировать"
                active={true}
            />
        )
    }

    let tabLinkViewComp = null
    if (VIEW === router.pathname) {
        tabLinkViewComp = (
            <TabLink 
                title="Просмотр"
                active={true}
            />
        )
    }

    return (
        <div className={styles.tabs}>
            <TabLink 
                href="/users"
                title="Список"
                active={LIST == router.pathname}
            />
            { tabLinkUpdateComp }
            { tabLinkViewComp }
        </div>
    )
}

export default Tabs