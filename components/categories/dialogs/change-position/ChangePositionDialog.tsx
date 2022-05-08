
import { FC, useCallback } from 'react'
import { observer } from "mobx-react"
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/common/dialog"
import { FormContainer } from "@/components/categories/forms/change-position"
import * as api from "@/api/categories"
import store from "./store"


const ChangePositionDialog: FC = () => {

    const handleSubmit = useCallback((position: number) => {
        store.send(async (category) => {
            return api.changePosition(category.id, position)
        })
    }, [])

    if (!store.visible) {
        return null
    }

    const formId  = "change-position-form"
    const buttons = [
        {
            value: "Изменить",
            form: formId,
            type: "submit",
            disabled: store.submited
        },
        {
            value: "Закрыть",
            disabled: store.submited,
            onClick: () => {
                store.close()
            },
        }
    ]

    return ( 
        <Portal>
            <Dialog title={store.title} buttons={buttons} loading={store.submited}>
                <FormContainer
                    id={formId}
                    category={store.category} 
                    categoriesLength={store.data.categoriesLength}
                    type={store.type}
                    disabled={store.submited}
                    horizontal={true}
                    onSubmit={handleSubmit}
                />
            </Dialog>
        </Portal>    
    )
}
 
export default observer(ChangePositionDialog)

// class ChangePositionDialog extends PureComponent
// {
//     static EVENT_OPEN  = "change-position-dialog:open"
//     static EVENT_CLOSE = "change-position-dialog:close"

//     constructor(props)
//     {
//         super(props)
//         this.state = {
//             visible: false,
//             type: null,
//             category: null,
//             categoriesLength: null,
//             position: null,
//             errorPosition: "",
//             isSubmitted: false,
//             onOk: null,
//             onError: null,
//             onCancel: null,
//         }
//     }

//     componentDidMount = () =>
//     {
//         this.validator = new Validator()
//         const { eventManager } = this.props
//         eventManager
//             .on(ChangePositionDialog.EVENT_OPEN, (
//                 type, title, {category, categoriesLength}, {onOk, onError, onCancel}) => {
//                 this.setState({
//                     type,
//                     title,
//                     category,
//                     categoriesLength,
//                     onOk: onOk,
//                     onError: onError,
//                     onCancel: onCancel,
//                     visible: true,
//                 })
//                 this.validator
//                     .setValue("position", () => {
//                         return this.state.position
//                     })
//                     .setRule("position", {
//                         notEmpty: {
//                             message: "Выберите значение"
//                         },
//                         integer: {
//                             min: type == "up" ? 1 : category.position + 1,
//                             max: type == "up" ? category.position - 1 : categoriesLength,
//                             message: "Значение должно быть целым числом",
//                             tooSmall: "Значение не должно быть меньше {min}",
//                             tooBig: "Значение не должно быть больше {max}",
//                         }
//                     })
//             })
//             .on(ChangePositionDialog.EVENT_CLOSE, () => {
//                 this.setState({
//                     visible: false,
//                     type: null,
//                     category: null,
//                     categoriesLength: null,
//                     position: null,
//                     errorPosition: "",
//                     isSubmitted: false,
//                     onOk: null,
//                     onError: null,
//                     onCancel: null,
//                 })
//             })
//     }

//     componentWillUnmount = () =>
//     {
//         const { eventManager } = this.props
//         eventManager
//             .off(ChangePositionDialog.EVENT_OPEN)
//             .off(ChangePositionDialog.EVENT_CLOSE)
//     }

//     changeHandler = (e) =>
//     {
//         this.setState({
//             position: e.target.value
//         })
//     }

//     blurHandler = (e) =>
//     {
//         this.validator.validate()
//         this.setState({
//             errorPosition: this.validator.getFirstError("position") ?? ""
//         })
//     }

//     closeHandler = (e) =>
//     {
//         this.state.onCancel && this.state.onCancel()
//         this.props.eventManager.trigger(ChangePositionDialog.EVENT_CLOSE)
//     }

//     submitHandler = async (e) =>
//     {
//         e.preventDefault()
//         this.validator.validate()
//         this.setState({
//             errorPosition: this.validator.getFirstError("position") ?? ""
//         })

//         if (!this.validator.hasErrors()) {
//             const em = this.props.eventManager
//             const { category, position, onOk, onError } = this.state

//             this.setState({
//                 isSubmitted: true,
//             })
            
//             try {
//                 await api.changePosition(category.id, +position)
//                 onOk && onOk()
//             } catch (error) {
//                 onError && onError(error)
//                 return
//             } finally {
//                 em.trigger(ChangePositionDialog.EVENT_CLOSE)
//             }
//         }
//     }

//     render() 
//     {
//         if (!this.state.visible) {
//             return null
//         }

//         const { 
//             type, 
//             title, 
//             isSubmitted, 
//             category, 
//             categoriesLength,
//             errorPosition,
//         } = this.state

//         const buttons = [
//             {
//                 value: "Изменить",
//                 form: "change-position-form",
//                 type: "submit",
//                 className: isSubmitted ? "button_is-loading" : "",
//                 disabled: isSubmitted,
//             },
//             {
//                 value: "Закрыть",
//                 disabled: isSubmitted,
//                 onClick: this.closeHandler,
//             }
//         ]

//         return (
//             <Portal>
//                 <Dialog title={title} buttons={buttons}>
//                     <ChangePositionForm 
//                         category={category} 
//                         categoriesLength={categoriesLength}
//                         type={type}
//                         error={errorPosition}
//                         isSubmitted={isSubmitted}
//                         onSubmit={this.submitHandler}
//                         onChange={this.changeHandler}
//                         onBlur={this.blurHandler}
//                         horizontal={true}
//                     />
//                 </Dialog>
//             </Portal>
//         )
//     }
// }

// export default withEventManager(ChangePositionDialog)
