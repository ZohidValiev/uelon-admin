
import { FC } from "react"

type Props = {
    title: string
    icon: string
    className?: string
}

const Icon: FC<Props> = ({ title, icon, className="icon", ...props }) => {
    return (
        <svg className={className} {...props}>
            <title>{title}</title>
            <use href={`/images/icons.svg#${icon}`}></use>
        </svg>
    )
}

export default Icon