
const subscriptions = new Map<string, Set<Function>>()

const subscribe = (event: string, callback: Function) => {
    if (!subscriptions.has(event)) {
        subscriptions.set(event, new Set())
    }

    const callbacks = subscriptions.get(event)
    callbacks.add(callback)

    return () => {
        callbacks.delete(callback)

        if (callbacks.size === 0) {
            subscriptions.delete(event)
        }
    }
}

const broadcast = (event: string, ...data: any) => {
    if (!subscriptions.has(event)) {
        return;
    }

    const callbacks = subscriptions.get(event);
    callbacks.forEach((callback) => {
        callback(...data)
    });
}

export default {
    subscribe,
    broadcast,
} as const
