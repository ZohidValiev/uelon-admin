
import { AuthNextPage } from "@/types/pages"

const AccessDeniedPage: AuthNextPage = () => {
    return (
        <div>Доступ к ресурсу запрещен</div>
    )
}

AccessDeniedPage.auth = {
    role: "ROLE_MODERATOR"
}

export default AccessDeniedPage