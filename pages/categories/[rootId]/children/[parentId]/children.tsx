
import { useEffect } from "react"
import { useCategoriesLevel3, useCategory } from "@/hooks/categories"
import { _message } from "@/components/common/message"
import { _infoLoader } from "@/components/common/loaders/info-loader"
import { Page } from "@/components/page"
import { Tabs as CategoriesTabs } from "@/components/categories/tabs"
import { TableContainer } from "@/components/categories/table"
import { Breadcrumbs } from "@/components/categories/breadcrumbs"
import styles from "@/styles/Page.module.css"
import { ChangePositionDialog } from "@/components/categories/dialogs/change-position"
import { CategoryCUDialog, _categoryCUDialog } from "@/components/categories/dialogs/cu-dialog"
import { CategoryToolBar } from "@/components/categories/tool-bar"
import { useRouter } from "next/router"
import { Roles } from "@/types/users"
import { AuthNextPage } from "@/types/pages"


const CategoriesChildrenChildrenPage: AuthNextPage = () => {

    const { query } = useRouter()
    const rootId   = parseInt((query.rootId as unknown) as string)
    const parentId = parseInt((query.parentId as unknown) as string)

    const {
        data:rootCategory,
        isLoading: isLoadingRoot,
        error:errorRoot,
    } = useCategory(rootId)
    
    const {
        data:parentCategory,
        isLoading: isLoadingParent,
        error:errorParent,
    } = useCategory(parentId)

    const { 
        data:categories, 
        isLoading:isLoadingCategories,
        error:errorCategories,
        mutate,
     } = useCategoriesLevel3(parentId, {
        onSuccess() {
            _message.close()
        }
    })

    const isLoading = isLoadingRoot || isLoadingParent || isLoadingCategories

    useEffect(() => {
        if (isLoading) {
            _infoLoader.open()
        } else {
            _infoLoader.close()
        }
    }, [isLoading])

    return (
        <Page title="Категории">
            <CategoriesTabs />
            <div className={styles.page__content}>
                <div className="tool-wrapper">
                    { !errorRoot && !errorParent && (
                        <Breadcrumbs
                            categories={[rootCategory, parentCategory]} 
                            isLoading={isLoadingRoot || isLoadingParent}
                        />
                    ) }
                    <CategoryToolBar />
                </div>
                { !errorCategories && (
                    <TableContainer 
                        categories={categories} 
                        mutate={mutate}
                        isLoading={isLoadingCategories}
                    />
                ) }
                { errorCategories && (
                    <>Error categories</>
                )}
                <CategoryCUDialog parentId={parentId} />
                <ChangePositionDialog />
            </div>
        </Page>
    )
}

CategoriesChildrenChildrenPage.auth = {
    role: Roles.ROLE_ADMIN  
}

export default CategoriesChildrenChildrenPage