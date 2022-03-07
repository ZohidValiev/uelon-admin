
import { Form as _Form, Fieldset, FormRow, FieldInput, FieldSelect } from "@/components/common/form"
import { Entity } from "@/types/categories"
import { ChangeEventHandler, FC, FocusEventHandler, FormEventHandler } from "react"


type PositionType = "up" | "down"

interface Props {
    id: string
    type: PositionType
    category: Entity.Category
    categoriesLength: number
    disabled: boolean
    error: string
    horizontal?: boolean
    onSubmit: FormEventHandler<HTMLFormElement>
    onChange: ChangeEventHandler<HTMLSelectElement>
    onBlur: FocusEventHandler<HTMLSelectElement>
}

const Form: FC<Props> = ({ 
    id, type, category, categoriesLength, error, disabled, horizontal = false,
    onChange, onBlur, onSubmit, 
}) => {

    return (
        <_Form 
            // id="change-position-form" 
            id={id}
            className="form_size-sm"
            disabled={disabled}
            onSubmit={onSubmit}
        >
            <Fieldset disabled={disabled}>
                <FormRow 
                    error="" 
                    horizontal={horizontal}
                >
                    <FieldInput 
                        readOnly={true} 
                        inputClass="form__input_size-sm"
                        value={`${category.translations.UZ.title} / ${category.translations.RU.title}`}
                        label="Название" 
                        horizontal={horizontal}
                    />
                </FormRow>
                <FormRow 
                    error=""
                    horizontal={horizontal}
                >
                    <FieldInput 
                        readOnly={true} 
                        inputClass="form__input_size-sm"
                        value={category.position}
                        label="Текущая позиция"
                        horizontal={horizontal}
                    />
                </FormRow>
                <FormRow 
                    error={error} 
                    horizontal={horizontal}
                >
                    <FieldSelect 
                        readOnly={false} 
                        inputClass="form__input_size-sm"
                        required={true}
                        label="Новая позиция"
                        onChange={onChange}
                        onBlur={onBlur}
                        horizontal={horizontal}
                    >   
                        { renderPositions(type, category, categoriesLength) }
                    </FieldSelect>
                </FormRow>
            </Fieldset>
        </_Form>
    )
}

export default Form

function renderPositions(type: PositionType, category: Entity.Category, categoriesLength: number) {
    let options = [(
        <option key={0} value="">-- Выберите --</option>
    )]
    
    if (type === "up") {    
        for (let position = 1; position < category.position; position++) {
            options.push(
                <option key={position} value={position}>
                    {position}
                </option>
            )
        }
    } else {
        for (let position = category.position + 1; position <= categoriesLength; position++) {
            options.push(
                <option key={position} value={position}>
                    {position}
                </option>
            )
        }
    }

    return options
}