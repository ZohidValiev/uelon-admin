
import { FC, PropsWithChildren } from "react"

type Props = {
    className?: string
}

const Fieldset: FC<PropsWithChildren<Props>> = ({ children, className="", ...props }) => {

    return (
        <fieldset className={`form__fieldset ${className}`} {...props}>
            {children}
        </fieldset>
    )
}

export default Fieldset