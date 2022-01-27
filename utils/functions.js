
export function getUserRole(roles) {
    if (roles.includes("ROLE_ADMIN")) {
        return "ROLE_ADMIN"
    }

    if (roles.includes("ROLE_MODERATOR")) {
        return "ROLE_MODERATOR"
    }

    return "ROLE_USER"
}

export function getUserRoles() {
    return [
        ["ROLE_USER", "Пользователь"],
        ["ROLE_MODERATOR", "Модератор"],
        ["ROLE_ADMIN", "Администратор"],
    ]
}

export function getUserStatuses() {
    return [
        [0, "Удален"], //deleted
        [1, "Неактивен"], //inactive
        [2, "Активен"], //active
        [3, "Заблокирован"], //blocked
    ]
}

export function callcSequenceIndex(ix, page, perPage) {
    return ix + (perPage * (page - 1))
}