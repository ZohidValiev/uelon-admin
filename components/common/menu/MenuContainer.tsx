
import { useRouter } from "next/router"
import { FC, useState, memo, MouseEventHandler } from "react"
import Menu from "./Menu"


const MenuContainer: FC = () => {

    const router = useRouter()
    const [links] = useState(() => {
        return [
            {
                title: "Главная",
                href: "/"
            },
            {
                title: "Выход",
                onClick: (e) => {
    
                }
            },
        ]
    })

    return (
        <Menu links={links}/>
    )
}

export default memo(MenuContainer)