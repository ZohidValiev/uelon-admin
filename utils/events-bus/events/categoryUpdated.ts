
import eventsBus from "../eventsBus"

const event = 'categoryUpdated'

const subscribe = (callback: (id: number) => void) => {
    return eventsBus.subscribe(event, callback)
}

const broadcast = (id: number) => {
    eventsBus.broadcast(event, id)
}

export default {
    subscribe,
    broadcast,
}