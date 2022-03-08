
import { useEffect } from "react"
import { useCategoriesLevel3, useCategory } from "@/hooks/categories"
import { _message } from "@/components/common/message"
import { _infoLoader } from "@/components/common/loaders/info-loader"
import { Page } from "@/components/page"
import { Tabs as CategoriesTabs } from "@/components/categories/tabs"
import { TableContainer } from "@/components/categories/table"
import { Breadcrumbs } from "@/components/common/breadcrumbs"
import styles from "@/styles/Page.module.css"
import { ChangePositionDialog } from "@/components/categories/dialogs/change-position"
import { CategoryCUDialog, _categoryCUDialog } from "@/components/categories/dialogs/cu-dialog"
import { CategoryToolBar } from "@/components/categories/tool-bar"
import { FC } from "react"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { BreadcrumbsSpinner } from "@/components/common/spinners/breadcrumbs"
import { TableSpinner } from "@/components/common/spinners/table"
import { getCategoryTitle } from "@/types/categories"


const CategoriesChildrenChildrenPage: FC = () => {

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

    useEffect(() => {
        if (isLoadingRoot || isLoadingParent || isLoadingCategories) {
            _infoLoader.open()
        } else {
            _infoLoader.close()
        }
    }, [isLoadingRoot, isLoadingParent, isLoadingCategories])

    if (errorRoot || errorParent || errorCategories) {
        return (
            <>Error</>
        )
    }

    return (
        <Page title="Категории">
            <CategoriesTabs />
            <div className={styles.page__content}>
                <div className="tool-wrapper">
                    { isLoadingRoot || isLoadingParent ? (
                        <BreadcrumbsSpinner />
                    ) : (
                        <Breadcrumbs 
                            links={[ 
                                getCategoryTitle(rootCategory),
                                getCategoryTitle(parentCategory),
                            ]} 
                        />
                    ) }
                    <CategoryToolBar />
                </div>
                { isLoadingCategories ? (
                    <TableSpinner rows={10} columns={7} />
                ) : (
                    <TableContainer categories={categories} mutate={mutate}/>
                ) }
                <CategoryCUDialog parentId={parentId} />
                <ChangePositionDialog />
            </div>
        </Page>
    )
}

export default CategoriesChildrenChildrenPage

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     return {
//         props: {
//             session: await getSession()
//         }
//     }
// }

