
import Link from 'next/link'
import styles from '@/styles/Tabs.module.css'

function TabLink({ href, title, active }) {

    if (active) {
        return (
            <span className={[styles.tabs__item, styles.tabs__item_active].join(" ")}>
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

export default TabLink