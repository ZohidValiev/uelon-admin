
import { Entity } from "@/types/categories";

export type Data = {
    categoriesLength: number
}

export interface Store {
    type: "up" | "down" | null
    title: string | null
    visible: boolean
    submited: boolean
    category: Entity.Category | null
    data: Data | null
    send(endpoint: Endpoint): void
    close(): void
}

export interface API {
    openUp(category: Entity.Category, data: Data, callbacks: Callbacks): void
    openDown(category: Entity.Category, data: Data, callbacks: Callbacks): void
    close(): void
}

export interface Callbacks {
    onOK(category: Entity.Category): void
    onError?(error: any): void
}

export interface Endpoint {
    (category: Entity.Category): Promise<Entity.Category>
}