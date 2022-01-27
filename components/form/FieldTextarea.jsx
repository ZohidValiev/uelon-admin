
function FieldTextarea({ 
    label, name, value, labelTitle="", labelClass, inputClass, readOnly, required, ...props }) {

    labelClass ??= ''
    inputClass ??= ''
    readOnly ??= false
    required ??= false

    return (
        <>
            <label 
                htmlFor={name} 
                className={`form__label ${labelClass}` + (required ? " form__label-required" : "")}
                title={labelTitle}
            >
                {label}
            </label>
            <textarea id={name}
                      name={name}
                      value={value}
                      readOnly={readOnly}
                      className={`form__input ${inputClass}` + (readOnly ? " form__input_readonly" : "")}
                      {...props} />
        </>
    )
}

export default FieldTextarea