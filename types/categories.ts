
export enum Locale {
    UZ = "UZ",
    RU = "RU",
}

export enum Level {
    LEVEL1 = 1,
    LEVEL2 = 2,
    LEVEL3 = 3,
}

export namespace Entity {
    export interface Category {
        id: number
        level: number
        isActive: boolean
        hasChildren: boolean
        position: number
        icon: string
        translations: Record<Locale, Translation>
        createTime: string
        updateTime: string
    }

    export interface Translation {
        id: number
        title: string
        locale: string
    }
}

export namespace DTO {
    export interface Translation {
        locale: Locale
        title: string
    }

    export interface Create {
        parentId: number | null
        icon: string
        isActive: boolean
        translations: Translation[]
    }

    export interface Update {
        icon: string
        isActive: boolean
        translations: Translation[]
    }
}

export function getCategoryTitle(category: Entity.Category, locale: Locale = Locale.RU): string {
    return category.translations[locale].title
}