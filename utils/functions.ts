
export function getUserRole(roles) {
    if (roles.includes("ROLE_ADMIN")) {
        return "ROLE_ADMIN"
    }

    if (roles.includes("ROLE_MODERATOR")) {
        return "ROLE_MODERATOR"
    }

    return "ROLE_USER"
}

// export function getUserRoles() {
//     return [
//         ["ROLE_USER", "Пользователь"],
//         ["ROLE_MODERATOR", "Модератор"],
//         ["ROLE_ADMIN", "Администратор"],
//     ]
// }

// export function getUserStatuses() {
//     return [
//         [0, "Удален"], //deleted
//         [1, "Неактивен"], //inactive
//         [2, "Активен"], //active
//         [3, "Заблокирован"], //blocked
//     ]
// }

export function callcSequenceIndex(ix: number, page: number, perPage: number): number {
    return ix + (perPage * (page - 1))
}

export function arrayRepeat<T>(length: number, value: T): T[] {
    const result = Array<T>(length)

    for (let i = 0; i < length; i++) {
        result.push(value)
    }

    return result
}