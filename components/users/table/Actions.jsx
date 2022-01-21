
import ActionIcon from "./ActionIcon"

function Actions({ onUpdate }) {

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