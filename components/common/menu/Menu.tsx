
import { FC, memo, MouseEventHandler } from "react"
import MenuLink from "./MenuLink"
import styles from "@/styles/Menu.module.css"


interface Props {
    links: {
        title: string
        href?: string
        onClick?: MouseEventHandler<HTMLAnchorElement>
    }[]
}

const Menu: FC<Props> = ({ links }) => {

    return (
        <ul className={styles.menu}>
            { links.map(({ title, href, onClick }, ix) => (
                <MenuLink
                    key={ix}
                    title={title}
                    href={href}
                    onClick={onClick}
                />
            ))}
        </ul>
    )
}

export default memo(Menu)