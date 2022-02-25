
import { Component, ChangeEventHandler, FocusEventHandler, FormEventHandler } from "react"
import { Status, STATUSES_ARRAY } from "@/types/users"
import Validator from "@/utils/validator"
import Form from "./Form"

interface Props {
    id: string
    disabled: boolean
    value: Status
    onSubmit: (value: Status) => void
}

interface State {
    value: Status
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
                    range: STATUSES_ARRAY,
                    message: "Выбрано неправильное значение",
                }
            })
    }

    componentWillUnmount() 
    {
        this.validator = null
    }

    handleBlur: FocusEventHandler<HTMLSelectElement> = (e) => {
        this.validator.validate("value")
        this.setState({
            error: this.validator.getFirstError("value") ?? ""
        })
    }

    handleChange: ChangeEventHandler<HTMLSelectElement> = (e) =>
    {
        this.setState({
            value: parseInt(e.target.value) as Status
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