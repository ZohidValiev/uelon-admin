
import { useCategory } from '@/hooks/categories'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import CategoryView from "./CategoryView"
import { ViewGridSpinner } from "@/components/common/spinners/view-grid"
import { _infoLoader } from '@/components/common/loaders/info-loader'
import { CategoryViewToolBar } from "@/components/categories/view-tool-bar"
import events from "@/events-bus"

const CategoryViewContainer: FC = () => {

    const { query, push } = useRouter()
    const id = parseInt((query.id as unknown) as string)
    const { data: category, isLoading, isValidating, mutate } = useCategory(id)

    useEffect(() => {
        return events.categoryUpdated.subscribe((id) => {
            mutate()
        })
    }, [mutate])

    useEffect(() => {
        return events.categoryDeleted.subscribe((id) => {
            push('/categories')
        })
    }, [])

    useEffect(() => {
        if (isLoading || isValidating) {
            _infoLoader.open()
        } else {
            _infoLoader.close()
        }
    }, [isLoading, isValidating])

    if (isLoading) {
        return (
            <ViewGridSpinner rows={8} />
        )
    }

    return (
        <>
            <CategoryViewToolBar category={category}/>
            <CategoryView category={category}/>
        </>
    )
}

export default CategoryViewContainer