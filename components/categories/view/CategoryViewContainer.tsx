
import { useCategory } from '@/hooks/categories'
import { useRouter } from 'next/router'
import { FC } from 'react'
import CategoryView from "./CategoryView"
import { ViewGridSpinner } from "@/components/common/spinners/view-grid"

const CategoryViewContainer: FC = () => {

    const { query } = useRouter()
    const id = parseInt((query.id as unknown) as string)
    const { data: category, isLoading } = useCategory(id)

    if (isLoading) {
        return (
            <ViewGridSpinner rows={8} />
        )
    }

    return (
        <CategoryView category={category}/>
    )
}

export default CategoryViewContainer