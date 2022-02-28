
import { FC, SVGProps } from "react"

interface Props extends SVGProps<SVGSVGElement> {
    icon: string
    title?: string
    className?: string
}

const Icon: FC<Props> = ({ children, title, icon, className="icon", ...props }) => {
    return (
        <svg className={className} {...props} >
            <title>{title}</title>
            <use href={`/images/icons.svg#${icon}`}></use>
        </svg>
    )
}

export default Icon