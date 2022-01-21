
import { Form, Fieldset, FormRow, FieldInput, FieldSelect } from "@/components/form"


function ChangePositionForm({ 
    type, category, categoriesLength, error, isSubmitted, 
    onChange, onBlur, onSubmit, horizontal=false }) {

    return (
        <Form id="change-position-form" 
              className="form_size-sm"
              onSubmit={onSubmit}
              horizontal={horizontal}
        >
            <Fieldset disabled={isSubmitted}>
                <FormRow 
                    error="" 
                    horizontal={horizontal}
                >
                    <FieldInput 
                        readOnly={true} 
                        inputClass="form__input_size-sm"
                        value={`${category.translations.UZ.title} / ${category.translations.RU.title}`}
                        label="Название" 
                        horizontal={horizontal}
                    />
                </FormRow>
                <FormRow 
                    error=""
                    horizontal={horizontal}
                >
                    <FieldInput 
                        readOnly={true} 
                        inputClass="form__input_size-sm"
                        value={category.position}
                        label="Текущая позиция"
                        horizontal={horizontal}
                    />
                </FormRow>
                <FormRow 
                    error={error} 
                    horizontal={horizontal}
                >
                    <FieldSelect 
                        readOnly={false} 
                        inputClass="form__input_size-sm"
                        required={true}
                        label="Новая позиция"
                        onChange={onChange}
                        onBlur={onBlur}
                        horizontal={horizontal}
                    >
                        <option value="">-- Выберите --</option>
                        { renderPositions(type, category, categoriesLength) }
                    </FieldSelect>
                </FormRow>
            </Fieldset>
        </Form>
    )
}

export default ChangePositionForm

function renderPositions(type, category, categoriesLength) {
    let options = []
    
    if (type === "up") {    
        for (let position = 1; position < category.position; position++) {
            options.push(
                <option key={position} value={position}>
                    {position}
                </option>
            )
        }
    } else {
        for (let position = category.position + 1; position <= categoriesLength; position++) {
            options.push(
                <option key={position} value={position}>
                    {position}
                </option>
            )
        }
    }

    return options
}