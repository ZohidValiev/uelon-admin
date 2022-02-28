
export interface Store<E> {
    visible: boolean
    submited: boolean
    send(endpoint: Endpoint<E>): void
    close: () => void
}

export interface Callbacks<E> {
    onOK: (entity: E) => void
    onError?: (error: any) => void
}

export interface API<E> {
    open: (callbacks: Callbacks<E>) => void
    close: () => void
}

export interface Endpoint<E> {
    (): Promise<E>
}
