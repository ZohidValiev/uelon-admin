
import { useState, useEffect } from "react"
import { Portal, useEventManager } from "@/components/hoc"
import styles from "@/styles/Message.module.css"

function Message() {

    const em = useEventManager()
    const [state, setState] = useState({
        message: null,
        visible: false,
    })

    useEffect(() => {
        em.on("message:open", (message) => {
            setState({
                message,
                visible: true,
            })
        })
        em.on("message:close", () => {
            setState({
                message: null,
                visible: false,
            })
        })

        return () => {
            em.off("message:open")
            em.off("message:close")
        }
    }, [])

    if (!state.visible) {
        return null
    }

    return (
        <Portal>
            <div className={styles.messageOverlay}>
                <div className={styles.message}>{state.message}</div>
            </div>
        </Portal>
    )
}

export default Message