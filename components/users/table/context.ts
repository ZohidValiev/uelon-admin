
import { createContext, MouseEventHandler } from "react"
import { Entity } from "@/types/users"


export interface Value {
    handleUpdate: (user: Entity.User) => void
    handleRemove: (user: Entity.User) => void
}

export const UserActionsContext = createContext<Value>(null)