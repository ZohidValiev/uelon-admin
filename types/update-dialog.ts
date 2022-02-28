
export interface Store<E> {
    visible: boolean
    submited: boolean
    entity: E
    send(endpoint: Endpoint<E>): void
    close: () => void
}

export interface Callbacks<E> {
    onOK: (entity: E) => void
    onError?: (error: any) => void
}

export interface API<E> {
    open: (entity: E, callbacks: Callbacks<E>) => void
    close: () => void
}

export interface Endpoint<E> {
    (entity: E): Promise<E>
}
