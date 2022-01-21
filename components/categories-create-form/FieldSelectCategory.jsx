
function FieldSelectCategory({ categories, label, name, value, disabled, onChange, onBlur, isLoading }) {

    disabled ??= false

    return (
        <>
            <label htmlFor={name} 
                   className="form__label form__label-required">{label}</label>
            <select className={"form__input" + (isLoading ? " form__input_is-loading" : "")}
                    id={name}
                    name={name}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur}>
                <option value="">-- Выберите --</option>
                {categories.map((category) => {
                    const titles = []
                    for (let locale in category.translations) {
                        titles.push(category.translations[locale].title)
                    }
                    
                    const title = titles.join(' / ')

                    return (
                        <option key={category.id} value={category.id}>{title}</option>
                    )
                })}
            </select>
        </>
    )
}

export default FieldSelectCategory