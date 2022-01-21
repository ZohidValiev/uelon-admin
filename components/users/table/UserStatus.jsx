
import { Icon } from "@/components/icon"

function UserStatus({ status }) {
    
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

function getIconSettings(status) {
    switch (status) {
        case 0:
            return ["xCircleFill", "icon_error", "Удален"]
        case 1:
            return ["checkCircleFill", "icon_error", "Неактивный"]
        case 2:
            return ["checkCircleFill", "icon_success", "Активный"]
        case 3:
            return ["blocked", "icon_error", "Заблокирован"]
        default:
            return ["", "", ""]
    }
}