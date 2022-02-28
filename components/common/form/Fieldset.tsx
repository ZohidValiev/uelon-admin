
import { FC, HTMLProps } from "react"

interface Props extends HTMLProps<HTMLFieldSetElement> {
}

const Fieldset: FC<Props> = ({ children, className="", ...props }) => {

    return (
        <fieldset className={`form__fieldset ${className}`} {...props}>
            {children}
        </fieldset>
    )
}

export default Fieldset