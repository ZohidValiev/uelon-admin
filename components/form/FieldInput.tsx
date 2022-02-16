
import { FC, ChangeEvent, FocusEvent } from "react"

type Props = {
    type?: string
    name: string
    value: string|number
    label: string
    labelTitle?: string
    labelClass?: string
    inputClass?: string
    readOnly?: boolean
    required?: boolean
    horizontal?: boolean
    onChange?: (e: ChangeEvent) => void
    onBlur?: (e: FocusEvent) => void
}

const FieldInput: FC<Props> = ({ 
    label, name, value, labelTitle, labelClass="", inputClass="", readOnly=false, required=false, 
    horizontal=false, type="input", onChange, onBlur, ...props 
}) => {

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
                title={labelTitle}
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
                onChange={onChange}
                onBlur={onBlur}
                {...props}
            />
        </>
    )
}

export default FieldInput