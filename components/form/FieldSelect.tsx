
import { FC, PropsWithChildren } from "react"

type Props = {
    name: string
    value: string|number
    label: string
    labelTitle: string
    labelClass?: string
    inputClass?: string
    readOnly?: boolean
    required?: boolean
    horizontal?: boolean
}

const FieldSelect: FC<PropsWithChildren<Props>> = ({ 
        label, name, value, labelTitle, labelClass="", inputClass="", readOnly=false, required=false, 
        horizontal=false, children, ...props 
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
            <select 
                id={name}
                name={name}
                defaultValue={value}
                className={classesInput.join(" ")}
                {...props}
            >
                {children}
            </select>
        </>
    )
}

export default FieldSelect