

import { NextPage } from "next"
import { Roles } from "./users"

export enum AuthRole {
    ROLE_MODERATOR = Roles.ROLE_MODERATOR,
    ROLE_ADMIN = Roles.ROLE_ADMIN
}

export interface AuthType {
    role: AuthRole
}

export type AuthNextPage<P = {}> = NextPage<P> & {
    auth: AuthType
} 
