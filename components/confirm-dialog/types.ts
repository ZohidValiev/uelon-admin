
export interface Properties {
    visible: boolean
    content: string
}

export interface Callbacks {
    onOK: () => void
    onCancel: () => void
}

export interface API {
    open: (content: string, callbacks: Callbacks) => void
    close: () => void
}