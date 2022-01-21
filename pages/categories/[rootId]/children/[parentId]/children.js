
import * as api from "@/api/categories"
import { useCategoriesLevel3 } from "@/api/categories-hook"
import { _message } from "@/components/message"
import { Page } from "@/components/page"
import { Tabs as CategoriesTabs } from "@/components/categories-tabs"
import { TableContainer } from "@/components/categories-table"
import { Breadcrumbs } from "@/components/breadcrumbs"
import styles from "@/styles/Page.module.css"
import { CategoryDialog, ChangePositionDialog, _categoryDialog } from "@/components/categories-dialog"
import { ToolBar, ToolButton } from "@/components/tool"
import { useCallback } from "react"


function CategoriesChildrenChildrenPage({ rootCategory, parentCategory }) {

    const { data:categories, mutate } = useCategoriesLevel3(parentCategory.id, {
        onSuccess() {
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
                <Breadcrumbs links={[ rootCategory.title, parentCategory.title ]}/>
                <ToolBar>
                    <ToolButton icon="plusCircle" onClick={createHandler}>
                        Добавить
                    </ToolButton>
                </ToolBar>
                <TableContainer categories={categories} mutate={mutate} />
                <CategoryDialog />
                <ChangePositionDialog />
            </div>
        </Page>
    )
}

export default CategoriesChildrenChildrenPage

export async function getServerSideProps(context) {
    const { rootId, parentId } = context.query
    let response

    try {
        response = await Promise.all([
            api.loadCategory(rootId),
            api.loadCategory(parentId),
            api.loadCategoriesLevel3(parentId),
        ])
    } catch (error) {
        return {
            notFound: true
        }
    }
    
    const rootCategory   = response[0].data
    const parentCategory = response[1].data
    const categories     = response[2].data

    return {
        props: {
            rootCategory,
            parentCategory,
            fallback: {
                [`/api/categories/${parentId}/children`]: categories,
            }
        }
    }
}

