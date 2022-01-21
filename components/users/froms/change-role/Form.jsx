
import { Form as _Form, FormRow, FieldSelect } from "@/components/form"

function Form({ id, value, error, disabled, onSubmit, onChange }) {

    return (
        <_Form 
            id={id} 
            className="form_size-sm"
            onSubmit={onSubmit}
        >
            <FormRow error={error}>
                <FieldSelect
                    inputClass="form__input_size-sm"
                    name="value"
                    label="Роль:"
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                >
                    <option value="ROLE_USER">Пользователь</option>
                    <option value="ROLE_MODERATOR">Модератор</option>
                    <option value="ROLE_ADMIN">Адмнистратор</option>
                </FieldSelect>
            </FormRow>
        </_Form>
    )
}

export default Form