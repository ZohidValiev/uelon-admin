
import { FC } from "react"
import { Roles, hasUserRole, Auth } from "@/types/users"
import { useSession } from "@/hooks/session"
import Link from "next/link"
import styles from "@/styles/SidebarLinks.module.css"

const links = [
    {
        title: 'Категории',
        href: '/categories',
        role: Roles.ROLE_ADMIN,
    },
    {
        title: 'Пользователи',
        href: '/users',
        role: Roles.ROLE_ADMIN,
    },
]

const SidebarLinks: FC = () => {

    const { session } = useSession()
    const availableLinks = links.filter((link) => {
        return link.role ? hasUserRole(session.user as Auth.User, link.role) : true
    })

    return (
        <ul className={styles.sidebarLinks}>
            { availableLinks.map((link, ix) => (
                <li key={ix} 
                    className={styles.sidebarLinks__item}
                >
                    <Link href={link.href}>
                        <a className={styles.sidebarLinks__link}>
                            { link.title }
                        </a>
                    </Link>
                </li>
            )) }
        </ul>
    )
}

export default SidebarLinks