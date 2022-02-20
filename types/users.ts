
export const ROLE_USER = "ROLE_USER"
export const ROLE_MODERATOR = "ROLE_MODERATOR"
export const ROLE_ADMIN = "ROLE_ADMIN"
export type UserRoles = typeof ROLE_USER | typeof ROLE_MODERATOR | typeof ROLE_ADMIN

export namespace Entity {
    export interface User {
        id: number,
        email: string,
        nickname: string,
        roles: string[],
        status: number,
        createTime: string,
        updateTime: string,
    }
}

/**
 * Authentication
 */
export namespace Auth {
    // Возвращаемая информация о пользователе при успешной утентификации
    export interface User {
        id: number
        username: string
        nickname: string
        roles: UserRoles[]
    }
    
    // Данные возвращаемые сервером при успешной утентификации
    export interface Data {
        token: string
        data: User
    }
}

// export namespace Session {
//     export interface User {
//         id: number
//         roles: string[]
//         email?: string | null
//         name?: string | null
//         image?: string | null
//     }    
// }

// export namespace Action {
//     export interface UserCreateData {
//         email: string
//         nickname: string
//         role: string
//         status: number
//         password: string
//         useVerification: boolean
//     }    
// }

export interface UserCreateData {
    email: string
    nickname: string
    role: string
    status: number
    password: string
    useVerification: boolean
}  

export function canUserLogin(user: Auth.User): boolean {
    const roles = user.roles
    return roles.includes(ROLE_MODERATOR) || roles.includes(ROLE_ADMIN)
}

export function hasUserRole(user: Auth.User, role: string): boolean {
    return (user.roles as string[]).includes(role)
}