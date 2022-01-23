
import { Component } from "react"
import Form from "./Form"


class Form extends Component 
{
    validator = null

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
        this.validator = this.props.createValidator(this)
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
        const { id, disabled, render } = this.props
        const props = {
            id,
            value,
            error,
            disabled,
            onChange: this.onChange,
            onSubmit: this.onSubmit,
        }

        return this.props.render(props)
    }
}

export default Form