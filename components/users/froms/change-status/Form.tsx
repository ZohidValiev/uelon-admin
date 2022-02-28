import { FC, ChangeEventHandler, FocusEventHandler, FormEventHandler } from "react"
import { Status, getStatuses } from "@/types/users"
import { Form as _Form, FormRow, FieldSelect } from "@/components/common/form"


interface Props {
    id: string
    value: Status
    error: string
    disabled: boolean
    horizontal?: boolean
    onSubmit: FormEventHandler<HTMLFormElement>
    onChange: ChangeEventHandler<HTMLSelectElement>
    onBlur: FocusEventHandler<HTMLSelectElement>
}

const Form: FC<Props> = ({ id, value, error, disabled, onSubmit, onChange, onBlur, horizontal = false }) => {

    const statuses = getStatuses()

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
                    onBlur={onBlur}
                    horizontal={horizontal}
                >
                    { statuses.map((status, ix) => (
                        <option key={ix} value={status[0]}>{status[1]}</option>    
                    )) }
                </FieldSelect>
            </FormRow>
        </_Form>
    )
}

export default Form