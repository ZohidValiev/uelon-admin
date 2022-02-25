
interface IListener {
    namespace: string
    callback: (...args: any) => void
}

interface ICallback {
    (...args: any): void
}

class EventManager
{
    private _listeners = new Map<string, IListener[]>()

    on(event: string, callback: ICallback): this
    {
        if (event.trim() === '') {
            throw new Error('Аргумент "event" не должен быть пустой строкой')
        }

        const parsedEvent = this.parseEvent(event)

        if (!this._listeners.has(parsedEvent.event)) {
            this._listeners.set(parsedEvent.event, [])
        }

        this._listeners.get(parsedEvent.event).push({
            callback,
            namespace: parsedEvent.namespace,
        })

        return this
    }

    off(event: string): this
    {
        if (event.trim() === '') {
            throw new Error('Аргумент "event" не должен быть пустой строкой')
        }

        const parsedEvent = this.parseEvent(event)

        if (!this._listeners.has(parsedEvent.event)) {
            return this
        }

        if (parsedEvent.namespace === undefined) {
            this._listeners.delete(parsedEvent.event)
            return this
        }

        let listeners = this._listeners.get(parsedEvent.event)
        listeners = listeners.filter((listener) => {
            return listener.namespace !== parsedEvent.namespace
        })

        this._listeners.set(parsedEvent.event, listeners)

        return this
    }

    trigger(event: string, ...data: any): this
    {
        if (event.trim() === '') {
            throw new Error('Аргумент "event" не должен быть пустой строкой')        
        }

        const listeners = this._listeners.get(event) ?? []

        for (let listener of listeners) {
            listener.callback(...data)
        }

        return this
    }

    private parseEvent(event: string): { event: string, namespace: string } {
        const ix = event.indexOf('.')
        let _event: string
        let _namespace: string
        
        if (ix > 0) {
            _event = event.substring(0, ix)
            _namespace = event.substring(ix + 1)
        } else {
            _event = event
        }
    
        return {
            event: _event,
            namespace: _namespace,
        }
    }
}

export default EventManager