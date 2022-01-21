
import { memo } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/Tabs.module.css'

const LEVEL1 = '/categories'
const LEVEL2 = '/categories/[rootId]/children'
const LEVEL3 = '/categories/[rootId]/children/[parentId]/children'
const CREATE = '/categories/create'
const UPDATE = '/categories/update/[id]'
const VIEW   = '/categories/view/[id]'

function Tabs() {

    const router = useRouter()
    const query  = router.query

    let tabLinkLevel2Comp = null
    if ([LEVEL2, LEVEL3].includes(router.pathname) || ([UPDATE, VIEW].includes(router.pathname) && query.rootId)) {
        tabLinkLevel2Comp = <TabLink href={`/categories/${query.rootId}/children`}
                                     title="Уровень 2"
                                     active={LEVEL2 === router.pathname} />
    }

    let tabLinkLevel3Comp = null
    if ([LEVEL3].includes(router.pathname) || ([UPDATE, VIEW].includes(router.pathname) && query.rootId && query.parentId)) {
        tabLinkLevel3Comp = <TabLink href={`/categories/${query.rootId}/children/${query.parentId}/children`}
                                     title="Уровень 3"
                                     active={LEVEL3 === router.pathname}/>
    }

    // let tabLinkUpdateComp = null
    // if (UPDATE === router.pathname) {
    //     tabLinkUpdateComp = <TabLink title="Редактировать"
    //                                  active={UPDATE === router.pathname}/>
    // }

    let tabLinkViewComp = null
    if (VIEW === router.pathname) {
        tabLinkViewComp = <TabLink title="Просмотр"
                                   active={VIEW === router.pathname}/>
    }
    

    return (
        <div className={styles.tabs}>
            <TabLink href="/categories" 
                     title="Уровень 1" 
                     active={LEVEL1 === router.pathname}/>
            {tabLinkLevel2Comp}
            {tabLinkLevel3Comp}
            {/* {tabLinkUpdateComp} */}
            {tabLinkViewComp}
            {/* <TabLink href="/categories/create"
                     title="Добавить"
                     active={CREATE === router.pathname}/> */}
        </div>
    )
}

function TabLink({ href, title, active }) {

    if (active) {
        return (
            <span className={`${styles.tabs__item} ${styles.tabs__item_active}`}>
                {title}
            </span>
        )
    }

    return (
        <Link href={href}>
            <a className={`${styles.tabs__item}`}>{title}</a>
        </Link>
    )
}

export default memo(Tabs)