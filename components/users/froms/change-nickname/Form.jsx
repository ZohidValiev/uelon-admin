
import { Form as _Form, FormRow, FieldInput } from "@/components/form"

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
                <FieldInput 
                    labelClass="form__label_required"
                    inputClass="form__input_size-sm"
                    name="value"
                    label="Псевдоним"
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    horizontal={horizontal}
                />
            </FormRow>
        </_Form>
    )
}

export default Form