
import { useCategoriesLevel1 } from "@/hooks/categories"
import { _message } from "@/components/common/message"
import { Page } from "@/components/page"
import { Tabs as CategoryTabs } from "@/components/categories/tabs"
import { TableContainer } from "@/components/categories/table"
import { ChangePositionDialog } from "@/components/categories/dialogs/change-position"
import { CategoryCUDialog, _categoryCUDialog } from "@/components/categories/dialogs/cu-dialog"
import styles from "@/styles/Page.module.css"
import { useEffect } from "react"
import { CategoryToolBar } from "@/components/categories/tool-bar"
import { AuthNextPage } from "@/types/pages"
import { Roles } from "@/types/users"
import { TableSpinner } from "@/components/common/spinners/table"
import { _infoLoader } from "@/components/common/loaders/info-loader"


const CategoriesPage: AuthNextPage = () => {

    const { data:categories, isLoading, error, mutate } = useCategoriesLevel1({
        onSuccess:() => {
            _message.close()
        }
    })

    useEffect(() => {
        if (isLoading) {
            _infoLoader.open()
        } else {
            _infoLoader.close()
        }
    }, [isLoading])

    return (
        <Page title="Категории">
            <CategoryTabs />
            <div className={styles.page__content}>
                <CategoryToolBar />
                { !error && (
                    <TableContainer 
                        categories={categories} 
                        mutate={mutate}
                        isLoading={isLoading}
                    />
                )}
            </div>
            <CategoryCUDialog />
            <ChangePositionDialog />
        </Page>
    )
}

CategoriesPage.auth = {
    role: Roles.ROLE_ADMIN
}

export default CategoriesPage
