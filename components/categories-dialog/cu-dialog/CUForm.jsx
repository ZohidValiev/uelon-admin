
import { Form, Fieldset, FormRow, FieldInput, FieldSelect } from "@/components/form"


function CUForm({ id, fields , errors, isSubmitted, onChange, onBlur, onSubmit, horizontal=false }) {

    return (
        <Form id={id}
              className="form_size-sm"
              onSubmit={onSubmit}>
            <Fieldset disabled={isSubmitted}>
                <FormRow 
                    error={errors.titleUz}
                    horizontal={horizontal}
                >
                    <FieldInput 
                        required={true} 
                        inputClass="form__input_size-sm"
                        name="titleUz"
                        value={fields.titleUz}
                        label="Название Uz" 
                        onChange={onChange}
                        onBlur={onBlur}
                        horizontal={horizontal}
                    />
                </FormRow>
                <FormRow 
                    error={errors.titleRu}
                    horizontal={horizontal}
                >
                    <FieldInput 
                        required={true} 
                        inputClass="form__input_size-sm"
                        name="titleRu"
                        value={fields.titleRu}
                        label="Название Ru" 
                        onChange={onChange}
                        onBlur={onBlur}
                        horizontal={horizontal}
                    />
                </FormRow>
                <FormRow 
                    error="" 
                    horizontal={horizontal}
                >
                    <FieldInput 
                        inputClass="form__input_size-sm"
                        name="icon"
                        value={fields.icon}
                        label="Иконка"
                        onChange={onChange}
                        horizontal={horizontal}
                    />
                </FormRow>
                <FormRow 
                    error={errors.isActive}
                    horizontal={horizontal}
                >
                    <FieldSelect 
                        required={true}
                        inputClass="form__input_size-sm"
                        name="isActive"
                        value={fields.isActive}
                        label="Отображать"
                        onChange={onChange}
                        onBlur={onBlur}
                        horizontal={horizontal}
                    >
                        <option value="">-- Выберите --</option>
                        <option value="1">Да</option>
                        <option value="0">Нет</option>
                    </FieldSelect>
                </FormRow>
            </Fieldset>
        </Form>
    )
}

export default CUForm
