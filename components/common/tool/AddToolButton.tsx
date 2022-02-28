
import { FC, HTMLAttributes } from "react"
import ToolButton from "./ToolButton"

interface Props extends HTMLAttributes<HTMLButtonElement> {
}

function AddToolButton({ children, ...props }) {

    return (
        <ToolButton icon="plusCircle" {...props}>
            {children}
        </ToolButton>
    )
}

export default AddToolButton