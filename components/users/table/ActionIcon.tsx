
import { FC, MouseEventHandler } from "react"
import { Icon } from "@/components/icon"


interface Props {
    title: string
    icon: string
    onClick: MouseEventHandler<SVGSVGElement>
}

const ActionIcon: FC<Props> = ({ title, icon, onClick }) => {
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