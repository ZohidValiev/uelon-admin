
import { ReactNode } from "react"

export interface Store {
    type: string
    title: string
    content: string | ReactNode | null
    visible: boolean
    close(): void
}

export interface API {
    openInfo(title: string, content: string | ReactNode): void
    openError(title: string, content: string | ReactNode): void
    close(): void
}