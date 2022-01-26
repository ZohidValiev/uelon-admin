
import * as api from "@/api/categories"
import { useCategoriesLevel2 } from "@/hooks/categories"
import { _message } from "@/components/message"
import { Page } from "@/components/page"
import { Tabs as CategoriesTabs } from "@/components/categories-tabs"
import { TableContainer } from "@/components/categories-table"
import { Breadcrumbs } from "@/components/breadcrumbs"
import styles from "@/styles/Page.module.css"
import { useCallback } from "react"
import { ToolBar, ToolButton } from "@/components/tool"
import { CategoryDialog, _categoryDialog, ChangePositionDialog } from "@/components/categories-dialog"


function CategoriesChildrenPage({ parentCategory }) {

    const { data:categories, mutate } = useCategoriesLevel2(parentCategory.id, {
        onSuccess: () => {
            _message.close()
        }
    })

    const createHandler = useCallback(() => {
        _categoryDialog.openCreate({
            async endpoint(data) {
                return await api.create({
                    ...data,
                    parentId: parentCategory.id,
                })
            },
            onOk(category) {
                mutate([...categories, category])
            },
            onError(error) {
                _message.openError(error)
            }
        })
    }, [categories, mutate, parentCategory])

    return (
        <Page title="Категории">
            <CategoriesTabs />
            <div className={styles.page__content}>
                <Breadcrumbs links={[parentCategory.title]} />
                <ToolBar>
                    <ToolButton icon="plusCircle" onClick={createHandler}>
                        Добавить
                    </ToolButton>
                </ToolBar>
                <TableContainer categories={categories} mutate={mutate}/>
                <CategoryDialog />
                <ChangePositionDialog />
            </div>
        </Page>
    )
}

export default CategoriesChildrenPage

export async function getServerSideProps(context) {
    const { rootId } = context.query    
    let responses

    try {
        responses = await Promise.all([
            api.loadCategory(rootId),
            api.loadCategoriesLevel2(rootId),
        ])
    } catch (error) {
        return {
            notFound: true
        }
    }

    const parentCategory = responses[0].data
    const categories     = responses[1].data

    return {
        props: {
            parentCategory,
            fallback: {
                [`/api/categories/${rootId}/children`]: categories,
            },
        }
    }
}
