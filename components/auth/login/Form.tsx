
import { ChangeEvent, ChangeEventHandler, FC, FocusEvent, FocusEventHandler, FormEvent, FormEventHandler } from "react"
import { Form as _Form, FormRow, FieldInput, FormButtonRow, FormButton, ErrorBlock } from "@/components/common/form"


type Props = {
    action?: string
    csrfToken: string
    error?: string
    fields: { 
        username: string
        password: string
    }
    errors: { 
        username: string
        password: string
    }
    onSubmit: FormEventHandler<HTMLFormElement>
    onChange: ChangeEventHandler<HTMLInputElement>
    onBlur:   FocusEventHandler<HTMLInputElement>
}

const Form: FC<Props> = ({ action, error, fields, errors, csrfToken, onSubmit, onChange, onBlur }) => {

    return (
        <_Form 
            action={action}
            method="POST"
            onSubmit={onSubmit}
        >
            <input 
                type="hidden"
                name="csrfToken"
                defaultValue={csrfToken}
            />
            { !error ? null : (
                <FormRow error={false} className="mb-21">
                    <ErrorBlock message="Неправельный email или пароль" />
                </FormRow>
            ) }
            <FormRow error={errors.username}>
                <FieldInput 
                    type="email"
                    name="username"
                    label="Email:"
                    inputClass="form__input_text-center form__input_bold"
                    value={fields.username}
                    required={true}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </FormRow>
            <FormRow error={errors.password}>
                <FieldInput 
                    type="password"
                    name="password"
                    label="Пароль:"
                    inputClass="form__input_text-center form__input_password  form__input_bold"
                    value={fields.password}
                    required={true}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </FormRow>
            <FormButtonRow>
                <FormButton value="Войти" />
            </FormButtonRow>
        </_Form>
    )
}

export default Form