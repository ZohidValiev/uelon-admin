
// import { Form as _Form, FormRow, FieldInput } from "@/components/form"

import { Form as _Form, FormRow, FieldInput } from "@/components/form"

function Form({ fields, errors, csrfToken, onSubmit, onChange, onBlur }) {

    return (
        <_Form 
            method="POST"
            onSubmit={onSubmit}
        >
            <input 
                type="hidden"
                name="csrfToken"
                value={csrfToken}
            />
            <FormRow error={errors.username}>
                <FieldInput 
                    type="email"
                    name="username"
                    label="Email:"
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
                    value={fields.password}
                    required={true}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </FormRow>
            <div className="form__buttons">
                <button className="button form__button">
                    Войти
                </button>
            </div>
        </_Form>
    )
}

export default Form