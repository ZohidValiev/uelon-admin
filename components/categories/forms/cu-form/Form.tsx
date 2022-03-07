
import { ChangeEventHandler, FC, FocusEventHandler, FormEventHandler } from 'react';
import { Form as _Form, Fieldset, FormRow, FieldInput, FieldSelect } from "@/components/common/form"
import { Fields, Errors } from "./types"

interface Props {
    id: string
    fields: Fields
    errors: Errors
    disabled: boolean
    horizontal?: boolean
    onSubmit: FormEventHandler<HTMLFormElement>
    onChangeInput: ChangeEventHandler<HTMLInputElement>
    onChangeSelect: ChangeEventHandler<HTMLSelectElement>
    onBlur: FocusEventHandler<HTMLInputElement | HTMLSelectElement>
}

const Form: FC<Props> = ({ 
    id, fields , errors, disabled, horizontal=false, onChangeInput, onChangeSelect, onBlur, onSubmit,
 }) => {

    return (
        <_Form 
            id={id}
            className="form_size-sm"
            onSubmit={onSubmit}
        >
            <Fieldset disabled={disabled}>
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
                        onChange={onChangeInput}
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
                        onChange={onChangeInput}
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
                        onChange={onChangeInput}
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
                        value={fields.isActive == null ? null : (fields.isActive ? 1 : 0)}
                        label="Отображать"
                        onChange={onChangeSelect}
                        onBlur={onBlur}
                        horizontal={horizontal}
                    >
                        <option value="">-- Выберите --</option>
                        <option value="1">Да</option>
                        <option value="0">Нет</option>
                    </FieldSelect>
                </FormRow>
            </Fieldset>
        </_Form>
    )
}

export default Form
