
import { FC, HTMLAttributes } from "react"
import ToolButton from "./ToolButton"

interface Props extends HTMLAttributes<HTMLButtonElement> {
}

function DeleteToolButton({ children, ...props }) {

    return (
        <ToolButton icon="xCircle" {...props}>
            {children}
        </ToolButton>
    )
}

export default DeleteToolButton