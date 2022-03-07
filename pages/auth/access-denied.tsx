
import { Roles } from "@/types/users"
import { AuthNextPage } from "@/types/pages"

const AccessDeniedPage: AuthNextPage = () => {
    return (
        <div>Доступ к ресурсу запрещен</div>
    )
}

AccessDeniedPage.auth = {
    role: Roles.ROLE_MODERATOR
}

export default AccessDeniedPage