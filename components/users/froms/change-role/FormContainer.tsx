
import { Component, ChangeEventHandler, FocusEventHandler, FormEventHandler } from "react"
import { Roles, ROLES_ARRAY } from "@/types/users"
import Validator from "@/utils/validator"
import Form from "./Form"


interface Props {
    id: string
    disabled: boolean
    value: Roles
    onSubmit: (value: Roles) => void
}

interface State {
    value: Roles
    error: string
}

class FormContainer extends Component<Props, State>
{
    private validator: Validator

    constructor(props: Props)
    {
        super(props)
        this.state = {
            value: props.value,
            error: "",
        }
    }

    componentDidMount() 
    {
        this.validator = new Validator()
        this.validator
            .setValue("value", () => {
                return this.state.value
            })
            .setRule("value", {
                notEmpty: {
                    message: "Введите значение",
                },
                range: {
                    range: ROLES_ARRAY
                    // range: [
                    //     "ROLE_USER",
                    //     "ROLE_MODERATOR",
                    //     "ROLE_ADMIN",
                    // ],
                    // message: "Выбрано неправильное значение",
                }
            })
    }

    componentWillUnmount() 
    {
        this.validator = null
    }

    handleChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
    {
        this.setState({
            value: e.target.value as Roles
        })
    }

    handleBlur: FocusEventHandler<HTMLSelectElement> = (e) => {
        this.validator.validate("value")
        this.setState({
            error: this.validator.getFirstError("value") ?? ""
        })
    }

    handleSubmit: FormEventHandler<HTMLFormElement> = (e) =>
    {
        e.preventDefault()
        this.validator.validate()
        this.setState({
            error: this.validator.getFirstError("value") ?? ""
        })
        if (!this.validator.hasErrors()) {
            this.props.onSubmit(this.state.value)
        }
    }

    render() {
        const { value, error } = this.state
        const { id, disabled } = this.props

        return (
            <Form 
                id={id}
                value={value}
                error={error}
                disabled={disabled}
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                horizontal={true}
            />
        )
    }
}

export default FormContainer