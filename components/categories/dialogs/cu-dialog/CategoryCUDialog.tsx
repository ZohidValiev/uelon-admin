
import { FC, useCallback } from "react"
import { observer } from "mobx-react"
import { Portal } from "@/components/hoc"
import * as api from "@/api/categories"
import { Dialog } from "@/components/common/dialog"
import { FormContainer } from "@/components/categories/forms/cu-form"
import { convertToCreateDto, convertToUpdateDto, Fields } from "@/components/categories/forms/cu-form/types"
import store from "./store"


interface Props {
    parentId?: number | null
}

const CategoryCUDialog: FC<Props> = ({ parentId=null }) => {

    const handleSubmit = useCallback((fields: Fields) => {
        store.send(async (category) => {
            if (category == null) {
                return api.create(convertToCreateDto(parentId, fields))
            } else {
                return api.update(category.id, convertToUpdateDto(fields))
            }
        })
    }, [parentId])

    if (!store.visible) {
        return null
    }

    const formId  = "cu-form" 
    const buttons = [
        {
            type: "submit",
            form: formId,
            value: "Сохранить",
            disabled: store.submited,
        },
        {
            value: "Отмена",
            disabled: store.submited,
            onClick() {
                store.close()
            }
        },
    ]    
    const category = store.getCategory()
    const fields: Fields = {
        titleUz: category?.translations.UZ.title ?? "",
        titleRu: category?.translations.RU.title ?? "",
        icon: category?.icon ?? "",
        isActive: category?.isActive,
    }


    return ( 
        <Portal>
            <Dialog title={store.getTitle()} buttons={buttons} loading={store.submited}>
                <FormContainer
                    id={formId}
                    fields={fields}
                    disabled={store.submited}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </Portal>
    );
}

export default observer(CategoryCUDialog);