
import { useCallback, useEffect, useState } from "react"
import { useEventManager } from "../hoc"
import AlertComp from "./Component"

function AlertEvent({ type="default", visible = false, visibleEvents = [], hiddenEvents = [], children}) {

    const em = useEventManager()
    const [_visible, setVisible] = useState(visible)
    const closeHandler = useCallback(() => {
        setVisible(false)
    }, [])

    useEffect(() => {
        visibleEvents.forEach((event) => {
            em.on(event, () => {
                setVisible(true)
            })
        })

        hiddenEvents.forEach((event) => {
            em.on(event, () => {
                setVisible(false)
            })
        })

        return () => {
            [...visibleEvents, ...hiddenEvents].forEach((event) => {
                em.off(event)
            })
        }
    })

    if (!_visible) {
        return null
    }

    return (
        <AlertComp type={type} onClose={closeHandler}>
            {children}
        </AlertComp>
    )
}

export default AlertEvent