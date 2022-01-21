
import { Component } from "react"
import Validator from "@/utils/validator"
import Form from "./Form"


class FormContainer extends Component 
{
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

    handleChange = (e) =>
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>
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
                horizontal={true}
            />
        )
    }
}

export default FormContainer