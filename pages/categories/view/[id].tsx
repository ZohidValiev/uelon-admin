
import { AuthNextPage } from "@/types/pages"
import { Page } from "@/components/page"
import { Tabs as CategoryTabs } from "@/components/categories/tabs"
import { CategoryViewContainer } from "@/components/categories/view"
import styles from "@/styles/Page.module.css"
import { Roles } from "@/types/users"


const ViewCategoryPage: AuthNextPage = () => {

    return (
        <Page title="Категории">
            <CategoryTabs />
            <div className={styles.page__content}>
                <CategoryViewContainer />
            </div>
        </Page>
    )
}

ViewCategoryPage.auth = {
    role: Roles.ROLE_ADMIN
}

export default ViewCategoryPage