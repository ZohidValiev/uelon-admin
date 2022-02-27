
import { DTO, Entity } from "@/types/users"

export interface Store {
    visible: boolean
    submited: boolean
    createUser(data: DTO.CreateUser): void
    close(): void
}

export interface Callbacks {
    onOK: (user: Entity.User) => void
    onError?: (error: any) => void
}

export interface API {
    open(callbacks: Callbacks): void
    close(): void
}