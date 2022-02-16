
import { FC } from "react"

type Props = {
    name: string
    value: string|number
    label: string
    labelTitle: string
    labelClass?: string
    inputClass?: string
    readOnly?: boolean
    required?: boolean
}

const FieldTextarea: FC<Props> = ({ 
    label, name, value, labelTitle, labelClass="", inputClass="", 
    readOnly=false, required=false, ...props }) => {

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