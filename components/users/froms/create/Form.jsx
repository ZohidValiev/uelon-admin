
import { getUserRoles, getUserStatuses } from "@/utils/functions"
import { Form as _Form, Fieldset, FormRow, FieldInput, FieldSelect } from "@/components/form"

function Form({ id, fields, errors, disabled, style, onSubmit, onChange, onBlur, horizontal=false }) {

    const roles = getUserRoles()
    const statuses = getUserStatuses()

    return (
        <_Form 
            id={id}
            style={style}
            className="form_size-sm" 
            onSubmit={onSubmit}
        >
            <Fieldset disabled={disabled}>
                <FormRow 
                    error={errors.email} 
                    horizontal={horizontal}
                >
                    <FieldInput
                        name="email"
                        inputClass="form__input_size-sm"
                        label="Email"
                        value={fields.email}
                        required={true}
                        horizontal={horizontal}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                </FormRow>
                <FormRow 
                    error={errors.nickname}
                    horizontal={horizontal}
                >
                    <FieldInput
                        name="nickname"
                        inputClass="form__input_size-sm"
                        label="Псевдоним"
                        value={fields.nickname}
                        required={true}
                        horizontal={horizontal}
                        onChange={onChange}
                    />
                </FormRow>
                <FormRow 
                    error={errors.role} 
                    horizontal={horizontal}
                >
                    <FieldSelect
                        name="role"
                        required={true}
                        inputClass="form__input_size-sm"
                        label="Роль"
                        value={fields.role}
                        horizontal={horizontal}
                        onChange={onChange}
                        onBlur={onBlur}
                    >
                        <option value="">--Выберите--</option>
                        { roles.map(([ role, name ]) => (
                            <option key={role} value={role}>{name}</option>
                        )) }
                    </FieldSelect>
                </FormRow>
                <FormRow 
                    error={errors.status} 
                    horizontal={horizontal}
                >
                    <FieldSelect
                        name="status"
                        required={true}
                        inputClass="form__input_size-sm"
                        label="Статус"
                        value={fields.status}
                        horizontal={horizontal}
                        onChange={onChange}
                        onBlur={onBlur}
                    >
                        <option value="">--Выберите--</option>
                        { statuses.map(([ status, name ]) => (
                            <option key={status} value={status}>{name}</option>
                        )) }
                    </FieldSelect>
                </FormRow>
                <FormRow 
                    error={errors.password} 
                    horizontal={horizontal}
                >
                    <FieldInput
                        type="password"
                        name="password"
                        inputClass="form__input_size-sm"
                        label="Пороль"
                        value={fields.password}
                        required={true}
                        horizontal={horizontal}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                </FormRow>
                <FormRow 
                    error={errors.passwordRepeat} 
                    horizontal={horizontal}
                >
                    <FieldInput
                        type="password"
                        name="passwordRepeat"
                        inputClass="form__input_size-sm"
                        label="Повторите пороль"
                        value={fields.passwordRepeat}
                        required={true}
                        horizontal={horizontal}
                        onChange={onChange}
                        onBlur={onBlur}
                    />
                </FormRow>
                <FormRow 
                    error={errors.useVerification} 
                    horizontal={horizontal}
                >
                    <FieldSelect
                        name="useVerification"
                        required={true}
                        inputClass="form__input_size-sm"
                        label="Запросить подтверждение"
                        labelTitle="Запросить подтверждение Email"
                        value={fields.useVerification}
                        horizontal={horizontal}
                        onChange={onChange}
                        onBlur={onBlur}
                    >
                        <option value="1">Да</option>
                        <option value="0">Нет</option>
                    </FieldSelect>
                </FormRow>
            </Fieldset>
        </_Form>
    )
}

export default Form