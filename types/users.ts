
export enum Status {
    STATUS_DELETED = 0,
    STATUS_INACTIVE = 1,
    STATUS_ACTIVE = 2,
    STATUS_BLOCKED = 3
}

export enum Roles {
    ROLE_USER = "ROLE_USER",
    ROLE_MODERATOR = "ROLE_MODERATOR",
    ROLE_ADMIN = "ROLE_ADMIN"
}

export const ROLES_ARRAY: readonly Roles[] = [
    Roles.ROLE_USER,
    Roles.ROLE_MODERATOR,
    Roles.ROLE_ADMIN,
]

export const STATUSES_ARRAY: readonly Status[] = [
    Status.STATUS_DELETED,
    Status.STATUS_INACTIVE,
    Status.STATUS_ACTIVE,
    Status.STATUS_BLOCKED,
]

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
        roles: Roles[]
    }
    
    // Данные возвращаемые сервером при успешной утентификации
    export interface Data {
        token: string
        refreshToken: string
        data: User
    }
}

export namespace DTO {
    export interface CreateUser {
        email: string
        nickname: string
        role: Roles
        status: Status
        password: string
        sendNotification: boolean
    }
}

export function setUserRole(user: Entity.User, role: Roles): void {
    if (role === Roles.ROLE_USER) {
        user.roles = [role]
        return
    }

    if (role === Roles.ROLE_MODERATOR) {
        user.roles = [
            Roles.ROLE_USER,
            role,
        ]
        return
    }
    
    if (role === Roles.ROLE_ADMIN) {
        user.roles = [
            Roles.ROLE_USER,
            Roles.ROLE_MODERATOR,
            role,
        ]
        return
    }

    throw new Error(`Role ${role} has not been found.`)
}

export function canUserLogin(user: Auth.User): boolean {
    const roles = user.roles
    return roles.includes(Roles.ROLE_MODERATOR) || roles.includes(Roles.ROLE_ADMIN)
}

export function hasUserRole(user: Auth.User, role: string): boolean {
    return (user.roles as string[]).includes(role)
}

export function getUserRole(user: Entity.User): Roles {
    if (user.roles.includes(Roles.ROLE_ADMIN)) {
        return Roles.ROLE_ADMIN
    }
    
    if (user.roles.includes(Roles.ROLE_MODERATOR)) {
        return Roles.ROLE_MODERATOR
    }
    
    return Roles.ROLE_USER
}

export function getRoles(): ReadonlyArray<[Roles, string]> {
    return [
        [Roles.ROLE_USER, "Пользователь"],
        [Roles.ROLE_MODERATOR, "Модератор"],
        [Roles.ROLE_ADMIN, "Администратор"],
    ]
}

export function getStatuses(): ReadonlyArray<[Status, string]> {
    return [
        [Status.STATUS_DELETED, "Удален"],
        [Status.STATUS_INACTIVE, "Неактивен"],
        [Status.STATUS_ACTIVE, "Активен"],
        [Status.STATUS_BLOCKED, "Заблокирован"],
    ]
}