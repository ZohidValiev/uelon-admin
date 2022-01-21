
function FieldInput({ label, name, value, readOnly, required, onChange, onBlur }) {

    readOnly ??= false
    required ??= false

    return (
        <>
            <label htmlFor={name} 
                   className={"form__label " + (required ? "form__label-required" : "")}>
                {label}
            </label>
            <input id={name}
                   name={name}
                   value={value}
                   readOnly={readOnly}
                   className={"form__input " + (readOnly ? "form__input_readonly" : "")}
                   onChange={onChange}
                   onBlur={onBlur} />
        </>
    )
}

export default FieldInput