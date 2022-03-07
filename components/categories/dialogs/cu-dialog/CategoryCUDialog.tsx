
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

// function CategoryDialog() {

//     const em = useEventManager()
//     const initState = {
//         title: null,
//         endpoint: null,
//         data: null,
//         onOk: null,
//         onError: null,
//         onCancel: null,
//         visible: false,
//         isSubmitted: false,
//     }
//     const [state, setState] = useState(initState)
//     const submitHandler = useCallback(async (fields) => {
//         setState(prevState => ({
//             ...prevState,
//             isSubmitted: true,
//         }))

//         const  { endpoint, onOk, onError } = state
//         let data = {
//             icon:     fields.icon,
//             isActive: fields.isActive == 1,
//             translations: [
//                 {
//                     locale: "UZ",
//                     title: fields.titleUz,
//                 },
//                 {
//                     locale: "RU",
//                     title: fields.titleRu,
//                 },
//             ]
//         }
//         let response

//         try {
//             response = await endpoint(data)
//             onOk && onOk(response.data)
//         } catch (error) {
//             onError && onError(error)
//             return
//         } finally {
//             em.trigger("category-dialog:close")
//         }
//     }, [state])


//     useEffect(() => {
//         em.on("category-dialog:open", (title, endpoint, getData, onOk, onError, onCancel) => {
//             setState(prevState => ({
//                ...prevState,
//                title,
//                endpoint,
//                data: getData(),
//                onOk: onOk,
//                onError: onError,
//                onCancel: onCancel,
//                visible: true,
//            })) 
//         }).on("category-dialog:close", () => {
//             setState(initState)
//         })

//         return () => {
//             em.off("category-dialog:open")
//             em.off("category-dialog:close")
//         }
//     }, [])

//     if (!state.visible) {
//         return null
//     }

//     const buttons = [
//         {
//             type: "submit",
//             form: "category-form",
//             className: state.isSubmitted ? "button_is-loading" : "",
//             value: "Сохранить",
//             disabled: state.isSubmitted,
//         },
//         {
//             value: "Отмена",
//             disabled: state.isSubmitted,
//             onClick() {
//                 state.onCancel && state.onCancel()
//                 em.trigger("category-dialog:close")
//             }
//         },
//     ]

//     return (
//         <Portal>
//             <Dialog title={state.title} buttons={buttons}>
//                 <CUFormContainer 
//                         id="category-form"
//                         fields={state.data}
//                         isSubmitted={state.isSubmitted}
//                         onSubmit={submitHandler}
//                 />
//             </Dialog>
//         </Portal>
//     )
// }

// export default memo(CategoryDialog)