
import { Icon } from "@/components/common/icon"
import { Entity } from "@/types/categories"
import { FC } from "react"


interface Props {
    category: Entity.Category
}

const StatusIcon: FC<Props> = ({ category }) => {

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