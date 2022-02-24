
import { Roles } from "@/types/users"
import { FC } from "react"

interface Props {
    roles: Roles[]
}

const UserRole: FC<Props> = ({ roles }) => {
    
    if (roles.includes(Roles.ROLE_ADMIN)) {
        return (
            <>Администратор</>
        )
    }

    if (roles.includes(Roles.ROLE_MODERATOR)) {
        return (
            <>Модератор</>
        )
    }

    if (roles.includes(Roles.ROLE_USER)) {
        return (
            <>Пользователь</>
        )
    }

    return null
}

export default UserRole