
export const ROLE_USER = "ROLE_USER"
export const ROLE_MODERATOR = "ROLE_MODERATOR"
export const ROLE_ADMIN = "ROLE_ADMIN"
export type UserRoles = typeof ROLE_USER | typeof ROLE_MODERATOR | typeof ROLE_ADMIN


export interface SessionAuthUser {
    id: number
    roles: string[]
    email?: string | null
    name?: string | null
    image?: string | null
}

export interface AuthUser {
    id: number
    username: string
    nickname: string
    roles: UserRoles[]
}

export interface AuthData {
    token: string
    data: AuthUser
}

// export interface IUserCreatePayload {
//     email: string
//     nickname: string
//     role: string
//     status: number
//     password: string
//     useVerification: boolean
// }

export function userHasPermission(user: AuthUser): boolean {
    const roles = user.roles
    return roles.includes(ROLE_MODERATOR) || roles.includes(ROLE_ADMIN)
}

export function hasPermission(user: AuthUser, role: string): boolean {
    return (user.roles as string[]).includes(role)
}