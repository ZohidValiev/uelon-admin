
import { loadCategory, loadCategoryByPath } from "../../../api/categories"
import { Tabs as CategoriesTabs } from "@/components/categories-tabs"
import { Page } from "@/components/page"
import { UpdateForm } from "@/components/categories-update-form"
import { AlertEvent } from "@/components/alert"
import styles from "@/styles/Page.module.css"

function UpdatePage({ rootCategory, parentCategory, category }) {

    return (
        <Page title="Категории">
            <CategoriesTabs />
            <div className={styles.page__content}>
                <AlertEvent type="success"
                            visibleEvents={["category:after-update.alert-success"]}
                            hiddenEvents={["category:before-update.alert-success"]}>
                    Категория успешно сохранена
                </AlertEvent>
                <AlertEvent type="error"
                            visibleEvents={["category:error-update.alert-error"]}
                            hiddenEvents={["category:before-update.alert-error"]}>
                    Возникла ошибка во время сохранения категории
                </AlertEvent>
                <div className="block block_bg-default">
                    <UpdateForm rootCategory={rootCategory}
                                parentCategory={parentCategory} 
                                category={category}/>   
                </div>
            </div>
        </Page>    
    )
}

export default UpdatePage


export async function getServerSideProps({ query }) {
    
    let rootCategory = null
    let parentCategory = null
    let category = null

    try {
        category = (await loadCategory(query.id)).data
        if (category.parent) {
            parentCategory = (await loadCategoryByPath(category.parent)).data
            if (parentCategory.parent) {
                rootCategory = (await loadCategoryByPath(parentCategory.parent)).data
            }
        }    
    } catch (error) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            rootCategory,
            parentCategory,
            category
        }
    }
}