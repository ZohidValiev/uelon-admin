
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { Form, FormRow, FieldInput, FieldSelect } from "@/components/form"

function FormPage() {

    const category = {
        level: 1,
        isActive: true,
        hasChildren: true,
        position: 2,
        translations: {
            UZ: {
                title: 'Test',
            },
            RU: {
                title: 'Тест',
            }
        }
    }

    const buttons = [
        {
            value: 'Изменить',
            // className: 'button dialog__button',
        },
        {
            value: 'Отмена',
            // className: 'button dialog__button',
        }
    ]

    return (
        // <div className="block block_bg-default" style={{width: "400px"}}>
        <Portal>
            <Dialog title="Опустить позицию" buttons={buttons}>
                <Form className="form_size-sm">
                    <FormRow error={false}>
                        <FieldInput readOnly={true} 
                                    inputClass="form__input_size-sm"
                                    value={`${category.translations.UZ.title}/${category.translations.RU.title}`}
                                    label="Название:" />
                    </FormRow>
                    <FormRow error={false}>
                        <FieldInput readOnly={true} 
                                    inputClass="form__input_size-sm"
                                    value={category.position}
                                    label="Текушая позиция:"/>
                    </FormRow>
                    <FormRow>
                        <FieldSelect readOnly={false} 
                                    inputClass="form__input_size-sm"
                                    required={true}
                                    label="Новая позиция:">
                            <option >-- Выберите --</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </FieldSelect>
                    </FormRow>
                </Form>
            </Dialog>
        </Portal>
            
        // </div>
    )
}

export default FormPage