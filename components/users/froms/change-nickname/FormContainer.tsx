
import { Component, FormEventHandler, ChangeEventHandler, FocusEventHandler } from "react"
import Validator from "@/utils/validator"
import Form from "./Form"


interface Props {
    id: string
    disabled: boolean
    value: string
    onSubmit: (value: string) => void
}

interface State {
    value: string
    error: string
}

class FormContainer extends Component<Props, State>
{
    private validator: Validator

    constructor(props)
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
                string: {
                    min: 2,
                    max: 30,
                    tooShort: "Введите не менее {min} символов",
                    tooLong: "Введите не более {max} символов",
                }
            })
    }

    componentWillUnmount() 
    {
        this.validator = null
    }

    handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        this.validator.validate("value")
        this.setState({
            error: this.validator.getFirstError("value")
        })
    }

    handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    {
        this.setState({
            value: e.target.value
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