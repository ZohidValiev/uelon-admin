
export interface Store<E, Data={}> {
    visible: boolean
    submited: boolean
    entity: E
    data: Data | null
    send(endpoint: Endpoint<E>): void
    close: () => void
}

export interface Callbacks<E> {
    onOK: (entity: E) => void
    onError?: (error: any) => void
}

export interface API<E, Data={}> {
    open: (entity: E, callbacks: Callbacks<E>, data?: Data) => void
    close: () => void
}

export interface Endpoint<E> {
    (entity: E): Promise<E>
}
