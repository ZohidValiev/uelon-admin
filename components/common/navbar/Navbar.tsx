
import { FC, memo, MouseEventHandler } from "react"
import NavbarLink from "./NavbarLink"
import styles from "@/styles/Menu.module.css"

export interface ItemLink {
    title: string
    href?: string
    onClick?: MouseEventHandler<HTMLAnchorElement>
}

interface Props {
    links: ItemLink[]
}

const Navbar: FC<Props> = ({ links }) => {

    return (
        <ul className={styles.menu}>
            { links.map(({ title, href, onClick }, ix) => (
                <NavbarLink
                    key={ix}
                    title={title}
                    href={href}
                    onClick={onClick}
                />
            ))}
        </ul>
    )
}

export default memo(Navbar)