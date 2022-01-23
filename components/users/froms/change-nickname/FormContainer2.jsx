
import { useCallback } from "react"
import Validator from "@/utils/validator"
import { FormValue } from "@/components/users"
import Form from "./Form"

function FormContainer2({ id, value, disabled, onSubmit, horizontal=false }) {

    const createValidator = useCallback((_this) => {
        return (new Validator())
            .setValue("value", () => {
                return _this.state.value
            })
            .setRule("value", {
                notEmpty: {
                    message: "Введите значение",
                },
                string: {
                    min: 2,
                    max: 30,
                    tooShort: "Введите не менее {min} символов",
                    tooLong: "Введите не более {max} символов",
                }
            })
    }, [])

    const render = useCallback(({ id, value, error, disabled, onChange, onSubmit, horizontal }) => (
        <Form
            id={id}
            value={value}
            error={error}
            disabled={disabled}
            onSubmit={onSubmit}
            onChange={onChange}
            horizontal={horizontal}
        />
    ), [])

    return (
        <FormValue 
            id={id}
            value={value}
            disabled={disabled}
            onSubmit={onSubmit}
            createValidator={createValidator}
            render={render}
            horizontal={horizontal}
        />
    )
}

export default FormContainer2