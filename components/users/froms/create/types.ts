
import * as users from "@/types/users"

export interface Fields {
    email: string
    nickname: string
    role: users.Roles | null
    status: users.Status | null
    password: string
    passwordRepeat: string
    useVerification: 0 | 1
}

export interface Errors {
    email: string
    nickname: string
    role: string
    status: string
    password: string
    passwordRepeat: string
    useVerification: string
}