
import { FC, Component, ComponentType } from "react"
import EventManager from "./EventManager"
import useEventManager from "./hook"


export interface WithEventManagerProps {
    eventManager: EventManager
}

export default function withEventManager<P extends WithEventManagerProps>(WrappedComponent: ComponentType<P>) {

    const displayName = WrappedComponent.displayName || Component.name || "Component"


    const WrapperComponent: FC<Omit<P, keyof WithEventManagerProps>> = (props) => {
    
        const eventManager = useEventManager()

        return (
            <WrappedComponent eventManager={eventManager} {...(props as P)} />
        )
    }

    WrapperComponent.displayName = `withEventManager(${displayName})`

    return WrapperComponent
}
