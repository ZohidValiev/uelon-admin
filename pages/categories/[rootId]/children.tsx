
import { GetServerSideProps } from "next"
import { useCategoriesLevel2, useCategory } from "@/hooks/categories"
import { _message } from "@/components/common/message"
import { Page } from "@/components/page"
import { Tabs as CategoriesTabs } from "@/components/categories/tabs"
import { TableContainer } from "@/components/categories/table"
import { TableSpinner } from "@/components/common/spinners/table"
import { Breadcrumbs } from "@/components/common/breadcrumbs"
import { BreadcrumbsSpinner } from "@/components/common/spinners/breadcrumbs"
import styles from "@/styles/Page.module.css"
import { useEffect } from "react"
import { CategoryToolBar } from "@/components/categories/tool-bar"
import { ChangePositionDialog } from "@/components/categories/dialogs/change-position"
import { CategoryCUDialog } from "@/components/categories/dialogs/cu-dialog"
import { _infoLoader } from "@/components/common/loaders/info-loader"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import { getCategoryTitle } from "@/types/categories"
import { Roles } from "@/types/users"
import { AuthNextPage } from "@/types/pages"


const CategoriesChildrenPage: AuthNextPage = () => {

    const { query } = useRouter()
    const rootId = parseInt((query.rootId as unknown) as string)
    const { 
        data:rootCategory, 
        isLoading:isLoadingRoot,
        error:errorRoot,
    } = useCategory(rootId)

    const { 
        data:categories, 
        isLoading:isLoadingCategories, 
        mutate, 
        error:errorCategories,
     } = useCategoriesLevel2(rootId, {
         onSuccess() {
             _message.close()
         }
     })

    useEffect(() => {
        if (isLoadingRoot || isLoadingCategories) {
            _infoLoader.open()
        } else {
            _infoLoader.close()
        }
    }, [isLoadingRoot, isLoadingCategories])

    if (errorRoot || errorCategories) {
        return (
            <>Error</>
        )
    }

    return (
        <Page title="Категории">
            <CategoriesTabs />
            <div className={styles.page__content}>
                <div className="tool-wrapper">
                    { isLoadingRoot ? (
                        <BreadcrumbsSpinner />
                    ) : (
                        <Breadcrumbs links={[getCategoryTitle(rootCategory)]} />
                    ) }
                    <CategoryToolBar />
                </div>
                { isLoadingCategories ? (
                    <TableSpinner rows={10} columns={7} />
                ) : (
                    <TableContainer categories={categories} mutate={mutate}/>
                ) }
                <CategoryCUDialog parentId={rootId}/>
                <ChangePositionDialog />
            </div>
        </Page>
    )
}

CategoriesChildrenPage.auth = {
    role: Roles.ROLE_ADMIN
}

export default CategoriesChildrenPage