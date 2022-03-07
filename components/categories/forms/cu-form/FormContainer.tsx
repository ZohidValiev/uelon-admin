
import React, { ChangeEventHandler, FocusEventHandler, FormEventHandler } from "react"
import Validator from "@/utils/validator"
import Form from "./Form"
import { Fields, Errors } from "./types"


interface Props {
    id: string
    disabled: boolean
    fields?: Fields
    onSubmit(fields: Fields): void
}

interface State {
    fields: Fields
    errors: Errors
}

export default class FormContainer extends React.Component<Props, State>
{
    private validator: Validator | null = null

    constructor(props: Props) 
    {
        super(props)

        const { fields } = props

        this.state = {
            fields: fields,
            errors: {
                titleUz: "",
                titleRu: "",
                icon: "",
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

    componentWillUnmount(): void {
        this.validator = null
    }

    handleSubmit: FormEventHandler<HTMLFormElement> = (e) =>
    {
        e.preventDefault()

        this.validator.validate()
        let errors = { ...this.state.errors }
        for (let field in errors) {
            errors[field] = this.validator.getFirstError(field) ?? ""
        }
        this.setState({
            errors
        })

        if (!this.validator.hasErrors()) {
            this.props.onSubmit(this.state.fields)
        }
    }

    handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) =>
    {
        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                [e.target.name]: e.target.value,
            }
        }))
    }
    
    handleChangeSelect: ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) =>
    {
        this.setState(prevState => ({
            fields: {
                ...prevState.fields,
                isActive: value.trim() === "" ? null : value === "1",
            }
        }))
    }

    handleBlur: FocusEventHandler<HTMLInputElement | HTMLSelectElement> = ({ target: { name } }) =>
    {
        const field = name
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
        const { id, disabled } = this.props

        return (
            <Form 
                id={id}
                fields={fields} 
                errors={errors}
                disabled={disabled}
                onSubmit={this.handleSubmit}
                onChangeInput={this.handleChangeInput}
                onChangeSelect={this.handleChangeSelect}
                onBlur={this.handleBlur}
                horizontal={true}
            />
        )
    }
}
