

import { NextPage } from "next"
import { Roles } from "@/types/users"


export interface AuthType {
    role: Roles
}

export type AuthNextPage<P = {}> = NextPage<P> & {
    auth: AuthType
} 
