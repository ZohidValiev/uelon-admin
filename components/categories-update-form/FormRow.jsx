
function FormRow({ children, error }) {
    error ??= ''

    return (
        <div className={"form__row" + (error !== '' ? " has-errors": "")}>
            {children}
            <div className="invalid">{error}</div>
        </div>
    )
}

export default FormRow
