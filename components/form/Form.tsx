
import { FC, HTMLProps } from "react"

interface Props extends HTMLProps<HTMLFormElement> {
    
}

const Form: FC<Props> = ({ className="", children, ...props }) => {

    return (
        <form className={"form " + className} {...props}>
            {children}
        </form>
    )
}

export default Form