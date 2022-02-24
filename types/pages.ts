

import { NextPage } from "next"
import { Roles } from "@/types/users"


export interface AuthType {
    role: Roles.ROLE_MODERATOR | Roles.ROLE_ADMIN
}

export type AuthNextPage<P = {}> = NextPage<P> & {
    auth: AuthType
} 
