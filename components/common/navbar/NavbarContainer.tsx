
import { useRouter } from "next/router"
import { FC, useState, memo, MouseEventHandler, useMemo } from "react"
import { _confirm } from "@/components/common/confirm-dialog"
import { signOut } from "next-auth/react"
import { useSession } from "@/hooks/session"
import Navbar, { ItemLink } from "./Navbar"


const NavbarContainer: FC = () => {

    const [links] = useState<ItemLink[]>(() => {
        return [
            {
                title: "Главная",
                href: "/",
            },
            {
                title: "Выход",
                onClick: () => {
                    _confirm.open("Вы желаете выйти?", {
                        onOK() {
                            signOut()
                        }
                    })
                }
            }
        ]
    })

    return (
        <Navbar links={links}/>
    )
}

export default memo(NavbarContainer)