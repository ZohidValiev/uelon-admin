
function Fieldset({ children, className="", ...props }) {

    return (
        <fieldset className={`form__fieldset ${className}`} {...props}>
            {children}
        </fieldset>
    )
}

export default Fieldset