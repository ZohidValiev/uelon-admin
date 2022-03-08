
import { FC, memo, MouseEventHandler } from "react"
import Link from "next/link"
import styles from "@/styles/Menu.module.css"


interface Props {
    title: string
    href?: string
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

const NavbarLink: FC<Props> = ({ title, href, onClick }) => {

    return (
        <li className={styles.menu__item}>
            { href ? (
                <Link href={href}>
                    <a className={styles.menu__link}>{title}</a>
                </Link>
            ) : (
                <a 
                    className={styles.menu__link} 
                    onClick={onClick}
                >
                    {title}
                </a>
            ) }
        </li>
    )
}

export default memo(NavbarLink)