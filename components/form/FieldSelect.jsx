
function FieldSelect({ 
        label, name, value, labelClass, inputClass, readOnly, required, children, 
        horizontal = false, ...props 
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
            <label htmlFor={name}
                   className={classesLabel.join(" ")}>
                {label}
            </label>
            <select id={name}
                    name={name}
                    defaultValue={value}
                    readOnly={readOnly}
                    className={classesInput.join(" ")}
                    {...props}>
                {children}
            </select>
        </>
    )
}

export default FieldSelect