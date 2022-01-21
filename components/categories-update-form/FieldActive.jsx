
function FieldActive({ label, name, value, onChange, onBlur }) {

    return (
        <>
            <label htmlFor={name}
                   className={"form__label form__label-required"}>
                {label}
            </label>
            <select id={name}
                    name={name}
                    defaultValue={value}
                    className="form__input"
                    onChange={onChange}
                    onBlur={onBlur}>
                <option value="1">Да</option>
                <option value="0">Нет</option>
            </select>
        </>
    )
}

export default FieldActive