
function FieldInput({ 
    label, name, value, labelClass, inputClass, readOnly, required, 
    horizontal=false, type="input", ...props 
}) {

    labelClass ??= ''
    inputClass ??= ''
    readOnly ??= false
    required ??= false

    const classesLabel = [
        "form__label v-label",
        labelClass,
        required ? " form__label-required" : "",
        horizontal ? "form__label_horizontal" : "",
    ]

    const classesInput = [
        "form__input v-input",
        inputClass,
        readOnly ? " form__input_readonly" : "",
        horizontal ? "form__input_horizontal" : "",
    ]

    return (
        <>
            <label 
                htmlFor={name} 
                className={classesLabel.join(" ")}
            >
                {label}
            </label>
            <input 
                type={type}
                id={name}
                name={name}
                value={value}
                readOnly={readOnly}
                className={classesInput.join(" ")}
                {...props}
            />
        </>
    )
}

export default FieldInput