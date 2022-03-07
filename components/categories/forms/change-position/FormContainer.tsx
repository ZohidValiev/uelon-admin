
import { ChangeEventHandler, FocusEventHandler, FormEventHandler } from "react"
import { Entity } from "@/types/categories";
import Validator from "@/utils/validator";
import { Component, ReactNode } from "react";
import Form from "./Form";

interface Props {
    id: string
    type: "up" | "down"
    disabled: boolean
    category: Entity.Category
    categoriesLength: number
    horizontal: boolean
    onSubmit: (position: number) => void
}

interface State {
    position: number | null
    error: string
}

class FormContainer extends Component<Props, State> {

    private validator: Validator | null = null
    
    constructor(props: Props) {
        super(props)
        this.state = {
            position: null,
            error: "",
        }
    }

    componentDidMount = () =>
    {
        const { type, category, categoriesLength } = this.props
        this.validator = new Validator()
        this.validator
            .setValue("position", () => {
                return this.state.position
            })
            .setRule("position", {
                notEmpty: {
                    message: "Выберите значение"
                },
                integer: {
                    min: type === "up" ? 1 : category.position + 1,
                    max: type === "up" ? category.position - 1 : categoriesLength,
                    message: "Значение должно быть целым числом",
                    tooSmall: "Значение не должно быть меньше {min}",
                    tooBig: "Значение не должно быть больше {max}",
                }
            })
    }

    componentWillUnmount(): void {
        this.validator = null
    }

    handleChange: ChangeEventHandler<HTMLSelectElement> = ({ target: { value } }) => {
        this.setState({
            position: value.trim() === "" ? null : parseInt(value)
        })
    }

    handleBlur: FocusEventHandler<HTMLSelectElement> = (e) =>
    {
        this.validator.validate()
        this.setState({
            error: this.validator.getFirstError("position") ?? ""
        })
    }

    handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const field = "position"
        this.validator.validate(field)
        this.setState({
            error: this.validator.getFirstError(field) ?? ""
        })
        if (!this.validator.hasErrors(field)) {
            this.props.onSubmit(this.state.position)
        }
    }

    render(): ReactNode {
        const { id, type, disabled, horizontal, category, categoriesLength } = this.props
        const { error } = this.state

        return (
            <Form 
                type={type}
                id={id}
                error={error}
                disabled={disabled}
                categoriesLength={categoriesLength}
                category={category}
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                horizontal={horizontal}
            />
        )
    }
}

export default FormContainer