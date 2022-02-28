
import { FC, FormEventHandler, ChangeEventHandler, FocusEventHandler } from "react"
import { Form as _Form, FormRow, FieldInput } from "@/components/common/form"


interface Props {
    id: string
    value: string
    error: string
    disabled: boolean
    horizontal?: boolean
    onSubmit: FormEventHandler<HTMLFormElement>
    onChange: ChangeEventHandler<HTMLInputElement>
    onBlur: FocusEventHandler<HTMLInputElement>
}

const Form: FC<Props> = ({ id, value, error, disabled, onSubmit, onChange, onBlur, horizontal = false }) => {

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
                    onBlur={onBlur}
                    horizontal={horizontal}
                />
            </FormRow>
        </_Form>
    )
}

export default Form