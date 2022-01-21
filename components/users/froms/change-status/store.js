
import { makeObservable, observable, action } from "mobx"
import Validator from "@/utils/validator"


class Store {
    value
    error
    _validator

    constructor(value) {
        makeObservable(this, {
            value: observable,
            error: observable,
            handleChange: action.bound,
        })

        this.value = value
    }

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
    }

    handleChange(value) {
        this.value = value
    }

    handleSubmit(submitCallback) {
        this.validator.validate()
        this.error = this.validator.getFirstError("value") ?? ""

        if (!this.validator.hasError()) {
            submitCallback(this.value)
        }
    }
}

export default Store