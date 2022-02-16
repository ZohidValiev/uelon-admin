
import { FC, PropsWithChildren } from "react"
import Error from "./Error"

type Props = {
    error?: string|false
    className?: string
    horizontal?: boolean
}

const FormRow: FC<PropsWithChildren<Props>> = ({ children, error="", className="", horizontal=false }) => {

    const classes = [
        "form__row",
        className,
        horizontal ? "form__row_horizontal" : "",
        error ? " has-errors": "",
    ]

    return (
        <div className={classes.join(" ")}>
            {children}
            { error === false ? null : <Error message={error} horizontal={horizontal} /> }
        </div>
    )
}

export default FormRow
