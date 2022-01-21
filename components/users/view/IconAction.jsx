
import { Icon } from "@/components/icon"

function IconAction({ onClick }) {

    return (
        <div className="icon-action icon-action_pr icon-action_r10">
            <Icon 
                className="icon cursorPointer iconHover"
                icon="gear"
                title="Изменить"
                onClick={onClick}
            />
        </div>
    )
}

export default IconAction
