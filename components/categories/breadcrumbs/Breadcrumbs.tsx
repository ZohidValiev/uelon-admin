
import { FC } from "react"
import { BreadcrumbsSpinner } from "@/components/common/spinners/breadcrumbs"
import { Breadcrumbs as _Breadcrumbs } from "@/components/common/breadcrumbs"
import { Entity, getCategoryTitle } from "@/types/categories"

interface Props {
    isLoading: boolean
    categories: Entity.Category[]
}

const Breadcrumbs: FC<Props> = ({ categories, isLoading }) => {

    if (isLoading) {
        return (
            <BreadcrumbsSpinner />
        )
    }

    const links: string[] = []
    categories.forEach((category) => {
        links.push(getCategoryTitle(category))
    })

    return (
        <_Breadcrumbs links={links} />
    )
}

export default Breadcrumbs