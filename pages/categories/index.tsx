
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { useCategoriesLevel1 } from "@/hooks/categories"
import { _message } from "@/components/common/message"
import { Page } from "@/components/common/page"
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

    if (error) {
        return (
            <>Error</>
        )
    }

    return (
        <Page title="Категории">
            <CategoryTabs />
            <div className={styles.page__content}>
                <CategoryToolBar />
                { isLoading && (
                    <TableSpinner 
                        columns={7} 
                        rows={10} 
                    />
                )}
                { !isLoading && (
                    <TableContainer 
                        categories={categories} 
                        mutate={mutate}
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     return {
//         props: {
//             session: await getSession(context)
//         }
//     }
//     // let response

//     // try {
//     //     response = await api.loadCategoriesLevel1()
//     // } catch (error) {
//     //     return {
//     //         notFound: true,
//     //     }
//     // }
    
//     // const categories = response.data

//     // return {
//     //     props: {
//     //         fallback: {
//     //             '/api/categories': categories
//     //         }
//     //     }
//     // }
// }
