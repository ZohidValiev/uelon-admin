
import { FieldSelect } from "@/components/form"

function FieldActive({ label, name, value, disabled, onChange, onBlur, horizontal=false }) {

    disabled ??= false

    return (
        <>
            <FieldSelect
                    inputClass="form__input_size-sm"
                    // id={name}
                    label={label}
                    name={name}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur}
                    horizontal={horizontal}
            >
                <option value="1">Да</option>
                <option value="0">Нет</option>
            </FieldSelect>
            {/* <label htmlFor="active" 
                   className="form__label form__label-required">{label}</label>
            <select className="form__input"
                    id={name}
                    name={name}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur}>
                <option value="1">Да</option>
                <option value="0">Нет</option>
            </select> */}
        </>
    )
}

export default FieldActive