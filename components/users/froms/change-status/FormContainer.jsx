
import { observer, useLocalObservable } from "mobx-react"
import Validator from "@/utils/validator"
import Form from "./Form"
// import store from "./store"

function FormContainer({ id, value, disabled, onSubmit }) {

    const store = useLocalObservable(() => ({
        value: value,
        error: "",
        get validator() {
            if (this._validator == null) {
                this._validator = new Validator()
                this._validator
                    .setValue("value", () => this.value)
                    .setRule("value", () => ({
                        notEmpty: {
                            message: "Выберите значение",
                        },
                        range: {
                            range: [
                                0, // deleted
                                1, // inactive
                                2, // active
                                3, // blocked
                            ],
                            message: "Выбрано неправильное значение",
                        }
                    }))
            }
    
            return this._validator
        },
        handleChnage(value) {
            this.value = value
        },
        handleSubmit() {
            this.validator.validate()
            this.error = this.validator.getFirstError("value") ?? ""

            if (!this.validator.hasError()) {
                onSubmit(this.value)
            }
        }
    }), {
        validator: false,
    })

    return (
        <Form 
            id={id}
            value={store.value}
            error={store.error}
            disabled={disabled}
            onSubmit={onSubmit}
            onChange={store.handleChange}
            horizontal={true}
        />
    )
}

export default observer(FormContainer)