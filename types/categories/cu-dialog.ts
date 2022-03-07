import { Entity } from "../categories";

export interface Store {
    visible: boolean
    submited: boolean
    close(): void
    send(endpoint: Endpoint): Promise<void>
    getTitle(): string
    getCategory(): Entity.Category | null
}

export interface Callbacks {
    onOK(category: Entity.Category): void
    onError?(error: any): void
}

export interface API {
    openCreate(callbacks: Callbacks): void
    openUpdate(category: Entity.Category, callbacks: Callbacks): void
    close(): void
}

export interface Endpoint {
    (category: Entity.Category | null): Promise<Entity.Category>
}