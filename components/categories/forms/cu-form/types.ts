import { DTO, Locale } from "@/types/categories";

export interface Fields {
    titleUz: string
    titleRu: string
    icon: string
    isActive: boolean | null
}

export interface Errors {
    titleUz: string
    titleRu: string
    icon: string
    isActive: string
}

export function convertToCreateDto(parentId: number | null, fields: Fields): DTO.Create {
    return {
        icon: fields.icon,
        isActive: fields.isActive,
        parentId,
        translations: [
            {
                locale: Locale.UZ,
                title: fields.titleUz,
            },
            {
                locale: Locale.RU,
                title: fields.titleRu,
            },
        ]
    }
}

export function convertToUpdateDto(fields:  Fields): DTO.Update {
    return {
        icon: fields.icon,
        isActive: fields.isActive,
        translations: [
            {
                locale: Locale.UZ,
                title: fields.titleUz,
            },
            {
                locale: Locale.RU,
                title: fields.titleRu,
            },
        ]
    }
}

