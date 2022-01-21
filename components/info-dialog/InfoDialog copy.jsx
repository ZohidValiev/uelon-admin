
import { Portal, useEventManager } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { useEffect, useState } from "react"


function InfoDialog() {

    const em = useEventManager()
    const [state, setState] = useState({
        type: null,
        title: null,
        content: null,
        visible: false,
    })

    useEffect(() => {
        em.on("info:open", (type, title, content) => {
            setState({
                type,
                title,
                content,
                visible: true,
            })
        })
        em.on("info:close", () => {
            setState({
                type: null,
                title: null,
                content: null,
                visible: false,
            })
        })

        return () => {
            em.off("info:open").off("info:close")
        }
    }, [])

    if (!state.visible) {
        return null
    }

    const buttons = [
        {
            value: "Закрыть",
            onClick: () => {
                em.trigger("info:close")
            }
        }
    ]

    return (
        <Portal>
            <Dialog type={state.type} title={state.title} buttons={buttons}>
                {state.content}
            </Dialog>
        </Portal>
    )
}

export default InfoDialog