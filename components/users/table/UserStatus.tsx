
import { FC } from "react"
import { Icon } from "@/components/icon"
import { Status } from "@/types/users"


interface Props {
    status: Status
}

const UserStatus: FC<Props> = ({ status }) => {
    
    const [icon, className, title] = getIconSettings(status)

    return (
        <div className="icon-action">
            <Icon 
                className={"icon icon_size_18 " + className}
                icon={icon}
                title={title}
            />
        </div>
    )
}

export default UserStatus

function getIconSettings(status: Status) {
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