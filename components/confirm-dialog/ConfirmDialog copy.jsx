
import { useEffect, useState } from "react"
import { Portal, useEventManager } from "@/components/hoc"
import { Dialog } from "@/components/dialog"

function ConfirmDialog() {

    const buttons = [
        {
            value: "Да",
            onClick: () => {
                state.onOk()
                em.trigger("confirm:close")
            },
        },
        {
            value: "Нет",
            onClick: () => {
                state.onCancel()
                em.trigger("confirm:close")
            },
        },
    ]

    const [state, setState] = useState({
        content: null,
        visible: false,
        onOk: null,
        onCancel: null,
    })
    const em = useEventManager()

    useEffect(() => {
        em.on("confirm:open", (content, onOk, onCancel) => {
            setState({
                content,
                visible: true,
                onOk: onOk,
                onCancel: onCancel,
            })
        })
        em.on("confirm:close", () => {
            setState({
                content: null,
                visible: false,
                onOk: null,
                onCancel: null,
            })
        })
        

        return () => {
            em.off("confirm:open")
            em.off("confirm:close")
        }
    }, [])

    if (!state.visible) {
        return null
    }

    return (
        <Portal>
            <Dialog title="Подтвердите" buttons={buttons}>
                {state.content}
            </Dialog>
        </Portal>
    )
}

export default ConfirmDialog