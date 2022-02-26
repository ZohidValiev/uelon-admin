
import { FC, MouseEventHandler } from "react"
import ActionIcon from "./ActionIcon"

interface Props {
    onUpdate: MouseEventHandler<SVGSVGElement>
}

const Actions: FC<Props> = ({ onUpdate }) => {

    return (
        <div className="icon-action">
            <ActionIcon 
                title="Редактировать"
                icon="pencil"
                onClick={onUpdate}
            />
        </div>
    )
}

export default Actions