
import { Page } from "@/components/page"
import { Tabs as CategoryTabs } from "@/components/categories-tabs"
import { loadCategory } from "@/api/categories"
import { CategoryView } from "@/components/category-view"
import styles from "@/styles/Page.module.css"


function ViewCategoryPage({ category }) {

    return (
        <Page title="Категории">
            <CategoryTabs />
            <div className={styles.page__content}>
                <CategoryView category={category} />
            </div>
        </Page>
    )
}

export default ViewCategoryPage

export async function getServerSideProps({ query }) {
    let response

    try {
        response = await loadCategory(query.id)
    } catch (error) {
        return {
            notFound: true
        }
    }

    const category = response.data

    return {
        props: {
            category
        }
    }
}