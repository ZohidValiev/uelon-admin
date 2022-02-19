
import { ChangeEvent, FocusEvent, Component, ReactNode, FormEvent } from "react"
import Validator from "@/utils/validator"
import Form from "./Form"

type Props = {
    action: string
    csrfToken: string
    error?: string
}

type State = {
    fields: {
        username: string
        password: string
    },
    errors: {
        username: string
        password: string
    },
}

class FormContainer extends Component<Props, State> {

    private _validator: Validator = null
    public state: State = {
        fields: {
            username: "",
            password: "",
        },
        errors: {
            username: "",
            password: "",
        }
    }

    componentDidMount(): void {
        this._validator = new Validator()
        this._validator
            .setValues({
                username: () => {
                    return this.state.fields.username
                },
                password: () => {
                    return this.state.fields.password
                }
            })
            .setRules({
                username: {
                    notEmpty: {
                        message: "Введите значение"
                    },
                    email: {
                        message: "Введите правильный email адрес"
                    }
                },
                password: {
                    notEmpty: {
                        message: "Введите значение"
                    },
                    string: {
                        min: 6,
                        max: 30,
                        tooShort: "Введите не менее {min} символов",
                        tooLong: "Введите не более {max} символов",
                    }
                }
            })
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const target = e.currentTarget
        this.setState((prevState) => ({
            fields: {
                ...prevState.fields,
                [target.name]: target.value,
            }
        }))
    }

    handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
        const name = e.currentTarget.name
        this._validator.validate(name)
        this.setState((prevState) => ({
            errors: {
                ...prevState.errors,
                [name]: this._validator.getFirstError(name)
            }
        }))
    }

    handleSubmit = (e: FormEvent): void => {
        if (!this._validator.validate()) {
            e.preventDefault()
            this.setState({
                errors: {
                    username: this._validator.getFirstError("username"),
                    password: this._validator.getFirstError("password"),
                }
            })
        }
    }

    render(): ReactNode {

        const { csrfToken, action, error } = this.props
        const { fields, errors } = this.state

        return (
            <Form 
                action={action}
                csrfToken={csrfToken}
                error={error}
                fields={fields}
                errors={errors}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onSubmit={this.handleSubmit}
            />
        )
    }
}

export default FormContainer