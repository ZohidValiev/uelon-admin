
import { Icon } from "@/components/common/icon"
import { MouseEventHandler } from "react"

interface Props {
    title: string
    icon: string
    onClick: MouseEventHandler<SVGSVGElement>
}

function ActionIcon({ title, icon, onClick }) {
    return (
        <Icon 
            className="icon-action__item"
            title={title}
            icon={icon}
            onClick={onClick}
        />
    )
}

export default ActionIcon