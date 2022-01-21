
import { AlertEvent } from "@/components/alert"
import { Page } from "@/components/page"
import { Tabs as CategoriesTabs } from "@/components/categories-tabs"
import { CreateForm } from "@/components/categories-create-form"
import styles from "@/styles/Page.module.css"

function CreatePage() {
    return (
        <Page title="Категории">
            <CategoriesTabs />
            <div className={styles.page__content}>
                <AlertEvent type="success"
                            visibleEvents={["category:after-create"]}
                            hiddenEvents={["category:before-create"]}>
                    Категория успешно добавлена.
                </AlertEvent>
                <AlertEvent type="error"
                            visibleEvents={["category:error-create"]}
                            hiddenEvents={["category:before-create"]}>
                    Произошла ошибка при добавлении категории.
                </AlertEvent>
                <div className="block block_bg-default">
                    <CreateForm />
                </div>
            </div>
        </Page>    
    )
}

export default CreatePage