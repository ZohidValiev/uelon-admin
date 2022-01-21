
import Error from "./Error"

function FormRow({ children, error, className, horizontal = false }) {

    error ??= ""
    className ??= ""

    const classes = [
        "form__row",
        className,
        horizontal ? "form__row_horizontal" : "",
        error ? " has-errors": "",
    ]

    return (
        <div className={classes.join(" ")}>
            {children}
            { error === false 
                ? null
                : <Error 
                    message={error} 
                    horizontal={horizontal} 
                  />
            }
        </div>
    )
}

export default FormRow
