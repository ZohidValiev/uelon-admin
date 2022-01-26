
import { Form as _Form, FormRow, FieldSelect } from "@/components/form"


function Form({ id, value, error, disabled, onSubmit, onChange, horizontal = false }) {

    return (
        <_Form 
            id={id} 
            className="form_size-sm"
            onSubmit={onSubmit}
        >
            <FormRow 
                error={error} 
                horizontal={horizontal}
            >
                <FieldSelect
                    labelClass="form__label_required"
                    inputClass="form__input_size-sm"
                    name="value"
                    label="Статус"
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    horizontal={horizontal}
                >
                    <option value="0">Удален</option>
                    <option value="1">Неактивен</option>
                    <option value="2">Активен</option>
                    <option value="3">Заблокирован</option>
                </FieldSelect>
            </FormRow>
        </_Form>
    )
}

export default Form