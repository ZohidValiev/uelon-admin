
import { memo } from "react"

function UserRole({ roles }) {
    
    if (roles.includes("ROLE_ADMIN")) {
        return "Администратор"
    }

    if (roles.includes("ROLE_MODERATOR")) {
        return "Модератор"
    }

    if (roles.includes("ROLE_USER")) {
        return "Пользователь"
    }

    return null
}

export default memo(UserRole)