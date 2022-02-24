
import { FC, HTMLProps } from "react"

interface Props extends HTMLProps<HTMLTextAreaElement> {
    label: string
    labelTitle: string
    labelClass?: string
    inputClass?: string
}

const FieldTextarea: FC<Props> = ({ 
    label, name, value, labelTitle, labelClass="", inputClass="", readOnly=false, required=false, 
    onChange, onBlur, ...props }) => {

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