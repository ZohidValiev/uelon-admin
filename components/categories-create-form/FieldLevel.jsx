
function FieldLevel({ value, disabled, onChange, onBlur }) {

    disabled ??= false

    return (
        <>
            <label htmlFor="level" 
                   className="form__label form__label-required">Уровень вложенности: </label>
            <select className="form__input"
                    id="level"
                    name="level"
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur}>
                <option value="1">Уровень 1</option>
                <option value="2">Уровень 2</option>
                <option value="3">Уровень 3</option>
            </select>
        </>
    )
}

export default FieldLevel