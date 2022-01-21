
import { useState, useCallback } from "react"
import AlertComp from "./Component"

function Alert({ type = "default", visible = false, children }) {
    
    const [_visible, setVisible] = useState(visible)
    const closeHandler = useCallback(() => {
        setVisible(false)
    }, [])

    if (!_visible) {
        return null
    }

    return (
        <AlertComp type={type} onClose={closeHandler}>
            {children}
        </AlertComp>
    )
}

export default Alert