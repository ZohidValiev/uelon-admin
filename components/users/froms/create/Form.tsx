
import { Form as _Form, Fieldset, FormRow, FieldInput, FieldSelect } from "@/components/common/form"
import { ChangeEventHandler, CSSProperties, FC, FocusEventHandler, FormEventHandler, HTMLProps } from "react"
import { Errors, Fields } from "./types"
import * as users from "@/types/users"


interface Props {
    id: string,
    disabled: boolean, 
    style: CSSProperties,
    fields: Fields,
    errors: Errors,
    horizontal?: boolean
    onSubmit: FormEventHandler<HTMLFormElement>
    onChangeInput: ChangeEventHandler<HTMLInputElement>
    onChangeSelect: ChangeEventHandler<HTMLSelectElement>
    onBlur: FocusEventHandler<HTMLInputElement | HTMLSelectElement>
}

const Form: FC<Props> = ({ 
    id, style, disabled, fields, errors, horizontal=false, 
    onSubmit, onChangeInput, onChangeSelect, onBlur 
}) => {

    const roles = users.getRoles()
    const statuses = users.getStatuses()

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
                        onChange={onChangeInput}
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
                        onChange={onChangeInput}
                        onBlur={onBlur}
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
                        onChange={onChangeSelect}
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
                        onChange={onChangeSelect}
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
                        onChange={onChangeInput}
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
                        onChange={onChangeInput}
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
                        onChange={onChangeSelect}
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