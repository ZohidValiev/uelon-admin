
export interface Store {
    visible: boolean
    getMessage(): string
}

export interface API {
    open(message: string): void
    close(): void
}