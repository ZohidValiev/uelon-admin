
import { FC, HTMLAttributes } from "react"
import ToolButton from "./ToolButton"

interface Props extends HTMLAttributes<HTMLButtonElement> {
}

function UpdateToolButton({ children, ...props }) {

    return (
        <ToolButton icon="pencil" {...props}>
            {children}
        </ToolButton>
    )
}

export default UpdateToolButton