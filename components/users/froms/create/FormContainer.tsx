
import { ChangeEventHandler, Component, FocusEventHandler, FormEventHandler } from "react"
import Validator from "@/utils/validator"
import * as users from "@/types/users"
import Form from "./Form"
import { Errors, Fields } from "./types"

interface Props {
    id: string
    disabled: boolean
    horizontal: boolean
    onSubmit: (data: users.DTO.CreateUser) => void
}

interface State {
    fields: Fields,
    errors: Errors,
}

class FormContainer extends Component<Props, State> {

    private validator: Validator = null
    public state: Readonly<State> = {
        fields: {
            email: "",
            nickname: "",
            role: null,
            status: null,
            password: "",
            passwordRepeat: "",
            sendNotification: 0,
        },
        errors: {
            email: "",
            nickname: "",
            role: "",
            status: "",
            password: "",
            passwordRepeat: "",
            sendNotification: "",
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
                    sendNotification: () => {
                        return this.state.fields.sendNotification
                    },
                })
                .setRules({
                    email: {
                        notEmpty: {
                            message: "?????????????? ????????????????",
                        },
                        email: {
                            message: "?????????????? ???????????????????? ??????????",
                        }
                    },
                    nickname: {
                        notEmpty: {
                            message: "?????????????? ????????????????",
                        },
                    },
                    role: {
                        notEmpty: {
                            message: "???????????????? ????????????????",
                        },
                        range: {
                            range: [
                                "ROLE_USER",
                                "ROLE_MODERATOR",
                                "ROLE_ADMIN",
                            ],
                            message: "???????????????? ???????????????????? ????????????????",
                        }
                    },
                    status: {
                        notEmpty: {
                            message: "???????????????? ????????????????",
                        },
                        range: {
                            range: users.STATUSES_ARRAY,
                            message: "???????????????? ???????????????????? ????????????????",
                        }
                    },
                    password: {
                        notEmpty: {
                            message: "?????????????? ????????????????",
                        },
                        string: {
                            min: 6,
                            max: 30,
                            tooShort: "?????????????? ???? ?????????? {min} ????????????????",
                            tooLong: "?????????????? ???? ?????????? {max} ????????????????",
                        }
                    },
                    passwordRepeat: {
                        notEmpty: {
                            message: "?????????????? ????????????????",
                        },
                        compare: {
                            operator: "===",
                            compareProperty: "password",
                            message: "???????????? ???? ??????????????????",
                        }
                    },
                    sendNotification: {
                        notEmpty: {
                            message: "???????????????? ????????????????",
                        },
                        range: {
                            range: [0, 1],
                            message: "?????????????? ???? ???????????????????? ????????????????",
                        }
                    }
                })
        }

        return this.validator
    }

    componentWillUnmount() {
        this.validator = null
        console.log("unmounted ", this.validator)
    }

    handleChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = ({ target: { name, value } }) => {
        let _value: string|number = value
        if (name === 'status') {
            _value = parseInt(value)
        }

        this.setState((prevState) => ({
            fields: {
                ...prevState.fields,
                [name]: _value,
            }
        }))
    }

    handleBlur: FocusEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        const name = e.target.name
        this.validator.validate(name)
        this.setState((prevState) => ({
            errors: {
                ...prevState.errors,
                [name]: this.validator.getFirstError(name),
            }
        }))
    }

    handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        
        if (!this.validator.validate()) {
            const errors = { ...this.state.errors }
            for (let field in errors) {
                errors[field] = this.validator.getFirstError(field) ?? ""
            }
            this.setState({ 
                errors,
            })
            return
        }
        
        const fields = this.state.fields
        this.props.onSubmit({
            email: fields.email,
            nickname: fields.nickname,
            password: fields.password,
            role: fields.role,
            status: fields.status,
            sendNotification: fields.sendNotification === 1
        })
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
                onChangeInput={this.handleChange}
                onChangeSelect={this.handleChange}
                onBlur={this.handleBlur}
            />
        )
    }
}

export default FormContainer