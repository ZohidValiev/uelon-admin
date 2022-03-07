
import * as api from "@/api/categories"
import { useCategoriesLevel1 } from "@/hooks/categories"
import { _message } from "@/components/common/message"
import { Page } from "@/components/common/page"
import { Tabs as CategoryTabs } from "@/components/categories/tabs"
import { TableContainer } from "@/components/categories/table"
import { CategoryDialog, ChangePositionDialog, _categoryDialog } from "@/components/categories/dialogs/change-position"
import styles from "@/styles/Page.module.css"
import { useCallback } from "react"
import { ToolBar, ToolButton } from "@/components/common/tool"


function CategoriesPage() {

    const { data:categories, mutate } = useCategoriesLevel1({
        onSuccess:() => {
            _message.close()
        }
    })

    const createHandler = useCallback(() => {
        _categoryDialog.openCreate({
            async endpoint(data) {
                return await api.create(data)
            },
            onOk(category) {
                mutate([...categories, category])
            },
            onError(error) {
                _message.openError(error)
            }
        })
    }, [categories, mutate])

    return (
        <Page title="Категории">
            <CategoryTabs />
            <div className={styles.page__content}>
                <ToolBar>
                    <ToolButton icon="plusCircle" onClick={createHandler}>
                        Добавить
                    </ToolButton>
                </ToolBar>
                <TableContainer categories={categories} mutate={mutate}/>
            </div>
            <CategoryDialog />
            <ChangePositionDialog />
        </Page>
    )
}

export default CategoriesPage

export async function getServerSideProps(context) {
    let response

    try {
        response = await api.loadCategoriesLevel1()
    } catch (error) {
        return {
            notFound: true,
        }
    }
    
    const categories = response.data

    return {
        props: {
            fallback: {
                '/api/categories': categories
            }
        }
    }
}