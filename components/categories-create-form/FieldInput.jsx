
function FieldInput({ label, name, value, disabled, onChange, onBlur }) {

    disabled ??= false

    return (
        <>
            <label htmlFor={name} 
                   className="form__label form__label-required">{label}</label>
            <input id={name} 
                   name={name}
                   className="form__input"
                   value={value}
                   disabled={disabled}
                   onChange={onChange}
                   onBlur={onBlur}/>
        </>
    )
}

export default FieldInput