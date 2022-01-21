
import { Icon } from "@/components/icon"

function StatusIcon({ category }) {

    const title = category.isActive ? "Активный" : "Неактивный"

    return (
        <div className="icon-action">
            <Icon 
                className={"icon icon_size_18 " + (category.isActive ? "icon_success" : "icon_error")}
                title={title}
                icon="checkCircleFill"
            />
        </div>
    )
}

export default StatusIcon