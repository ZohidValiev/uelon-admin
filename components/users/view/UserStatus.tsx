
import { Icon } from "@/components/common/icon"
import { Status } from "@/types/users"
import { FC } from "react"

interface Props {
    status: Status    
}

const UserStatus: FC<Props> = ({ status }) => {
    
    const [icon, className, title] = getIconSettings(status)

    return (
        <>
            <Icon 
                className={"icon icon_size_18 " + className}
                icon={icon}
                title={title}
            />
            { title }
        </>
    )
}

export default UserStatus

function getIconSettings(status: Status): [string, string, string] {
    switch (status) {
        case Status.STATUS_DELETED:
            return ["xCircleFill", "icon_error", "Удален"]
        case Status.STATUS_INACTIVE:
            return ["checkCircleFill", "icon_error", "Неактивный"]
        case Status.STATUS_ACTIVE:
            return ["checkCircleFill", "icon_success", "Активный"]
        case Status.STATUS_BLOCKED:
            return ["blocked", "icon_error", "Заблокирован"]
        default:
            return ["", "", ""]
    }
}