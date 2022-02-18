
import { ChangeEvent, FC, FocusEvent, FormEvent } from "react"
import { Form as _Form, FormRow, FieldInput, FormButtonRow, FormButton, ErrorBlock } from "@/components/form"


type Props = {
    action?: string
    csrfToken: string
    fields: { 
        username: string
        password: string
    }
    errors: { 
        username: string
        password: string
    }
    onSubmit: (e: FormEvent) => void
    onChange: (e: ChangeEvent) => void
    onBlur:   (e: FocusEvent) => void
}

const Form: FC<Props> = ({ action, fields, errors, csrfToken, onSubmit, onChange, onBlur }) => {

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
            <FormRow error={false} className="mb-21">
                <ErrorBlock message="Неправельный email или пароль" />
            </FormRow>
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