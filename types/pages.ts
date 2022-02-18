

import { NextPage } from "next"
import { ROLE_ADMIN, ROLE_MODERATOR } from "@/types/users"


export interface AuthType {
    role: typeof ROLE_ADMIN | typeof ROLE_MODERATOR
}

export type AuthNextPage<P = {}> = NextPage<P> & {
    auth: AuthType
} 
