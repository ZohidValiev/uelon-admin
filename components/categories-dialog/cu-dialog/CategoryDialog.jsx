
import { memo } from "react"
import { useState, useEffect, useCallback } from "react"
import { Portal, useEventManager } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import CUFormContainer from "./CUFormContainer"

function CategoryDialog() {

    const em = useEventManager()
    const initState = {
        title: null,
        endpoint: null,
        data: null,
        onOk: null,
        onError: null,
        onCancel: null,
        visible: false,
        isSubmitted: false,
    }
    const [state, setState] = useState(initState)
    const submitHandler = useCallback(async (fields) => {
        setState(prevState => ({
            ...prevState,
            isSubmitted: true,
        }))

        const  { endpoint, onOk, onError } = state
        let data = {
            icon:     fields.icon,
            isActive: fields.isActive == 1,
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
            response = await endpoint(data)
            onOk && onOk(response.data)
        } catch (error) {
            onError && onError(error)
            return
        } finally {
            em.trigger("category-dialog:close")
        }
    }, [state])


    useEffect(() => {
        em.on("category-dialog:open", (title, endpoint, getData, onOk, onError, onCancel) => {
            setState(prevState => ({
               ...prevState,
               title,
               endpoint,
               data: getData(),
               onOk: onOk,
               onError: onError,
               onCancel: onCancel,
               visible: true,
           })) 
        }).on("category-dialog:close", () => {
            setState(initState)
        })

        return () => {
            em.off("category-dialog:open")
            em.off("category-dialog:close")
        }
    }, [])

    if (!state.visible) {
        return null
    }

    const buttons = [
        {
            type: "submit",
            form: "category-form",
            className: state.isSubmitted ? "button_is-loading" : "",
            value: "Сохранить",
            disabled: state.isSubmitted,
        },
        {
            value: "Отмена",
            disabled: state.isSubmitted,
            onClick() {
                state.onCancel && state.onCancel()
                em.trigger("category-dialog:close")
            }
        },
    ]

    return (
        <Portal>
            <Dialog title={state.title} buttons={buttons}>
                <CUFormContainer 
                        id="category-form"
                        fields={state.data}
                        isSubmitted={state.isSubmitted}
                        onSubmit={submitHandler}
                />
            </Dialog>
        </Portal>
    )
}

export default memo(CategoryDialog)