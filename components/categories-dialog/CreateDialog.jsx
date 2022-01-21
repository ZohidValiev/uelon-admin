
import { useState, useEffect, useCallback } from "react"
import * as api from "@/api/categories"
import { Portal, useEventManager } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import CUFormContainer from "./CUFormContainer"

function CreateDialog() {

    const em = useEventManager()
    const submitHandler = useCallback(async (fields) => {
        setState(prevState => ({
            ...prevState,
            isSubmitted: true,
        }))

        let data = {
            icon:     fields.icon,
            isActive: fields.isActive == 1,
            parentId: state.parentId,
            translations: [
                {
                    locale: "UZ",
                    title: fields.titleUz,
                },
                {
                    locale: "RU",
                    title: fields.titleRu,
                },
            ]
        }
        let response

        try {
            response = await api.create(data)
        } catch (error) {
            em.trigger("category-create-dialog:error", error)
            return
        } finally {
           setState(prevState => ({
               ...prevState,
               isSubmitted: false,
           })) 
        }

        em.trigger("category-create-dialog:ok", response.data)
    }, [])
    const [state, setState] = useState({
        parentId: null,
        title: null,
        visible: false,
        isSubmitted: false,
    })


    useEffect(() => {
        em.on("category-create-dialog:open", (title, parentId) => {
            setState(prevState => ({
               ...prevState,
               title,
               parentId,
               visible: true,
           })) 
        }).on("category-create-dialog:close", () => {
            setState({
                title: null,
                parentId: null,
                visible: false,
                isSubmitted: false,
            })
        })

        return () => {
            em.off("category-create-dialog:open")
            em.off("category-create-dialog:close")
        }
    })

    if (!state.visible) {
        return null
    }

    const buttons = [
        {
            type: "submit",
            form: "category-create-form",
            className: state.isSubmitted ? "button_is-loading" : "",
            value: "Создать",
            disabled: state.isSubmitted,
        },
        {
            value: "Отмена",
            disabled: state.isSubmitted,
            onClick() {
                setState({
                    title: null,
                    parentId: null,
                    visible: false,
                    isSubmitted: false,
                })
                em.trigger("category-create-dialog:cancel")
            }
        },
    ]

    return (
        <Portal>
            <Dialog title={state.title} buttons={buttons}>
                <CUFormContainer id="category-create-form"
                                 isSubmitted={state.isSubmitted}
                                 onSubmit={submitHandler}/>
            </Dialog>
        </Portal>
    )
}

export default CreateDialog