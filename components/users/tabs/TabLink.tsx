
import { FC } from "react"
import Link from 'next/link'
import styles from '@/styles/Tabs.module.css'

interface Props {
    title: string
    href: string | null
    active: boolean
}

const TabLink: FC<Props> = ({ href, title, active }) => {

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