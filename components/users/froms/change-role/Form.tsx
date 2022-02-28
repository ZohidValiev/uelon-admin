
import { FC, ChangeEventHandler, FocusEventHandler, FormEventHandler } from "react"
import { Roles, getRoles } from "@/types/users"
import { Form as _Form, FormRow, FieldSelect } from "@/components/common/form"

interface Props {
    id: string
    value: Roles
    error: string
    disabled: boolean
    horizontal?: boolean
    onSubmit: FormEventHandler<HTMLFormElement>
    onChange: ChangeEventHandler<HTMLSelectElement>
    onBlur: FocusEventHandler<HTMLSelectElement>
}

const Form: FC<Props> = ({ id, value, error, disabled, onSubmit, onChange, horizontal=false }) => {

    const roles = getRoles()

    return (
        <_Form 
            id={id} 
            className="form_size-sm"
            onSubmit={onSubmit}
        >
            <FormRow error={error} horizontal={horizontal}>
                <FieldSelect
                    labelClass="form__label_required"
                    inputClass="form__input_size-sm"
                    name="value"
                    label="Роль"
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    horizontal={horizontal}
                >
                    { roles.map((role, ix) => (
                        <option key={ix} value={role[0]}>{role[1]}</option>
                    )) }
                </FieldSelect>
            </FormRow>
        </_Form>
    )
}

export default Form