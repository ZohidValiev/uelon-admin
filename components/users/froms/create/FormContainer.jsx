
import { Component } from "react"
import Validator from "@/utils/validator"
import Form from "./Form"


class FormContainer extends Component {

    validator = null
    state = {
        fields: {
            email: "",
            nickname: "",
            role: "",
            status: "",
            password: "",
            passwordRepeat: "",
            useVerification: 0,
        },
        errors: {
            email: "",
            nickname: "",
            role: "",
            status: "",
            password: "",
            passwordRepeat: "",
            useVerification: "",
        }
    }

    componentDidMount() {
        if (this.validator === null) {
            this.validator = new Validator()
            this.validator
                .setValues({
                    email: () => {
                        return this.state.fields.email
                    },
                    nickname: () => {
                        return this.state.fields.nickname
                    },
                    role: () => {
                        return this.state.fields.role
                    },
                    status: () => {
                        return this.state.fields.status
                    },
                    password: () => {
                        return this.state.fields.password
                    },
                    passwordRepeat: () => {
                        return this.state.fields.passwordRepeat
                    },
                    useVerification: () => {
                        return this.state.fields.useVerification
                    },
                })
                .setRules({
                    email: {
                        notEmpty: {
                            message: "Введите значение",
                        },
                        email: {
                            message: "Введите правильный адрес",
                        }
                    },
                    nickname: {
                        notEmpty: {
                            message: "Введите значение",
                        },
                    },
                    role: {
                        notEmpty: {
                            message: "Выберите значение",
                        },
                        range: {
                            range: [
                                "ROLE_USER",
                                "ROLE_MODERATOR",
                                "ROLE_ADMIN",
                            ],
                            message: "Выберите правильное значение",
                        }
                    },
                    status: {
                        notEmpty: {
                            message: "Выберите значение",
                        },
                        range: {
                            range: [
                                0, //deleted
                                1, //inactive
                                2, //active
                                3, //blocked
                            ],
                            message: "Выберите правильное значение",
                        }
                    },
                    password: {
                        notEmpty: {
                            message: "Введите значение",
                        },
                        string: {
                            min: 6,
                            max: 30,
                            tooShort: "Введите не менее {min} символов",
                            tooLong: "Введите не более {max} символов",
                        }
                    },
                    passwordRepeat: {
                        notEmpty: {
                            message: "Введите значение",
                        },
                        compare: {
                            operator: "===",
                            compareProperty: "password",
                            message: "Пароли не совпадают",
                        }
                    },
                    useVerification: {
                        notEmpty: {
                            message: "Выберите значение",
                        },
                        range: {
                            range: [0, 1],
                            message: "Выбрано не правильное значение",
                        }
                    }
                })
                console.log("mounted ", this.validator)
        }

        return this.validator
    }

    componentWillUnmount() {
        this.validator = null
        console.log("unmounted ", this.validator)
    }

    handleChange = (e) => {
        this.setState((prevState) => ({
            fields: {
                ...prevState.fields,
                [e.target.name]: e.target.value,
            }
        }))
    }

    handleBlur = (e) => {
        const name = e.target.name
        this.validator.validate(name)
        this.setState((prevState) => ({
            errors: {
                ...prevState.errors,
                [name]: this.validator.getFirstError(name),
            }
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log("validator=", this.validator)
        if (!this.validator.validate()) {
            let errors = {}
            for (let field in this.state.errors) {
                errors[field] = this.validator.getFirstError(field) ?? ""
            }
            this.setState({ errors })
            return
        }
        
        const fields = {
            ...this.state.fields,
            useVerification: this.state.useVerification == "1"
        }
        this.props.onSubmit(fields)
    }

    render() {

        const { id, disabled, horizontal } = this.props
        const { fields, errors } = this.state

        return (
            <Form 
                id={id}
                fields={fields}
                errors={errors}
                disabled={disabled}
                style={{width: "50rem"}}
                horizontal={horizontal}
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
            />
        )
    }
}

export default FormContainer