
export interface Store {
    visible: boolean
    content: string
    onOK(): void
    onCancel(): void
}

export interface Callbacks {
    onOK(): void
    onCancel?(): void
}

export interface API {
    open(content: string, callbacks: Callbacks): void
    close(): void
}