
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
        data: User
    }
}

export namespace UserCreateDialog {
    export interface Callbacks {
        onOK: (user: Entity.User) => void | null
        onError?: (error: any) => void | null
    }

    export interface Api {
        open: (callbacks: Callbacks) => void
        close: () => void
    }
}

export namespace DTO {
    export interface CreateUser {
        email: string
        nickname: string
        role: Roles
        status: Status
        password: string
        useVerification: boolean
    }    
}

export function canUserLogin(user: Auth.User): boolean {
    const roles = user.roles
    return roles.includes(Roles.ROLE_MODERATOR) || roles.includes(Roles.ROLE_ADMIN)
}

export function hasUserRole(user: Auth.User, role: string): boolean {
    return (user.roles as string[]).includes(role)
}

export function getRoles(): Array<[Roles, string]> {
    return [
        [Roles.ROLE_USER, "Пользователь"],
        [Roles.ROLE_MODERATOR, "Модератор"],
        [Roles.ROLE_ADMIN, "Администратор"],
    ]
}

export function getStatuses(): Array<[Status, string]> {
    return [
        [Status.STATUS_DELETED, "Удален"],
        [Status.STATUS_INACTIVE, "Неактивен"],
        [Status.STATUS_ACTIVE, "Активен"],
        [Status.STATUS_BLOCKED, "Заблокирован"],
    ]
}