
import eventManager from "@/utils/event-manager"

export function useEventManager() {
    return eventManager
}

export function withEventManager(Component) {

    function Wrapper(props) {
        return <Component {...props} eventManager={eventManager} />
    }

    // Wrapper.name = `Wrapper(${Component.name})`

    return Wrapper
}
