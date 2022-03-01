

import { NextPage } from "next"
import { Roles } from "./users"

export type AuthRole = Roles.ROLE_MODERATOR | Roles.ROLE_ADMIN

export interface AuthType {
    role: AuthRole
}

export type AuthNextPage<P = {}> = NextPage<P> & {
    auth: AuthType
} 
