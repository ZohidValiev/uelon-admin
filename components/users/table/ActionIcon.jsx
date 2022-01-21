import { Icon } from "@/components/icon"

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