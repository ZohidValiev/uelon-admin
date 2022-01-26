
import ToolButton from "./ToolButton"


function AddToolButton({ children, icon, ...props }) {

    return (
        <ToolButton icon="plusCircle" {...props}>
            {children}
        </ToolButton>
    )
}

export default AddToolButton