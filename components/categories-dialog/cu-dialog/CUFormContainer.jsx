
import React from "react"
import Validator from "@/utils/validator"
import CUForm from "./CUForm"

export default class CUFormContainer extends React.Component 
{
    constructor(props) 
    {
        super(props)

        const { fields } = props

        this.state = {
            fields: {
                titleUz:  fields?.titleUz ?? "",
                titleRu:  fields?.titleRu ?? "",
                icon:     fields?.icon ?? "",
                isActive: fields?.isActive ?? "",
            },
            errors: {
                titleUz: "",
                titleRu: "",
                isActive: "",
            },
        }
    }

    componentDidMount = () =>
    {
        this.validator = new Validator()
        this.validator
            .setValues({
                titleUz: () => {
                    return this.state.fields.titleUz
                },
                titleRu: () => {
                    return this.state.fields.titleRu
                },
                isActive: () => {
                    return this.state.fields.isActive
                },
            })
            .setRules({
                titleUz: {
                    notEmpty: {
                        message: "Введите значение"
                    },
                },
                titleRu: {
                    notEmpty: {
                        message: "Введите значение"
                    },
                },
                isActive: {
                    notEmpty: {
                        message: "Выберите значение"
                    },
                    boolean: {
                        message: 'Значение должно быть либо {true} либо {false}',
                    },
                },
            })
    }

    submitHandler = (e) =>
    {
        e.preventDefault()
        this.validator.validate()
        this.setState({
            errors: {
                titleUz : this.validator.getFirstError("titleUz") ?? "",
                titleRu : this.validator.getFirstError("titleRu") ?? "",
                isActive: this.validator.getFirstError("isActive") ?? "",
            }
        })

        if (!this.validator.hasErrors()) {
            this.props.onSubmit(this.state.fields)
        }
    }

    changeHandler = (e) =>
    {
        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                [e.target.name]: e.target.value,
            }
        }))
    }

    blurHandler = (e) =>
    {
        const field = e.target.name
        this.validator.validate(field)
        this.setState(prevState => ({
            errors: {
                ...prevState.errors,
                [field]: this.validator.getFirstError(field) ?? "",
            }
        }))
    }

    render() 
    {
        const { fields, errors } = this.state
        const { id, isSubmitted } = this.props

        return (
            <CUForm 
                id={id}
                fields={fields} 
                errors={errors}
                isSubmitted={isSubmitted}
                onSubmit={this.submitHandler}
                onChange={this.changeHandler}
                onBlur={this.blurHandler}
                horizontal={true}
            />
        )
    }
}
