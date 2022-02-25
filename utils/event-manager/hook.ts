
import { defaultHead } from "next/head"
import EventManager from "./EventManager"

let eventManager: EventManager | null = null

export default function useEventManager() {
    if (eventManager === null) {
        eventManager = new EventManager()
    }
    return eventManager
}