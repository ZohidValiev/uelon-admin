
class EventManager
{
    _listeners = new Map()

    on(event, callback)
    {
        if (typeof event !== 'string' || event === '') {
            throw new Error('Аргумент "event" не должен быть пустой строкой')
        }

        if (typeof callback !== 'function') {
            throw new Error('Аргумент "callback" должен быть функций')
        }

        const parsedEvent = parseEvent(event)

        if (!this._listeners.has(parsedEvent.event)) {
            this._listeners.set(parsedEvent.event, [])
        }

        this._listeners.get(parsedEvent.event).push({
            callback,
            namespace: parsedEvent.namespace,
        })

        return this
    }

    off(event)
    {
        if (typeof event !== 'string' || event === '') {
            throw new Error('Аргумент "event" не должен быть пустой строкой')
        }

        const parsedEvent = parseEvent(event)

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

    trigger(event, ...data)
    {
        if (typeof event !== 'string' || event === '') {
            throw new Error('Аргумент "event" не должен быть пустой строкой')        
        }

        const listeners = this._listeners.get(event) ?? []

        for (let listener of listeners) {
            listener.callback(...data)
        }
    }
}

function parseEvent(event) {
    const ix = event.indexOf('.')
    let _event, _namespace
    
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

const eventManager = new EventManager()

export default eventManager