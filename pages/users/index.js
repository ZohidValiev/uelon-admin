
import * as api from "@/api/users"
import { Page } from "@/components/page"
import { Panel } from "@/components/users/panel"
import { Tabs as UserTabs } from "@/components/users/tabs"
import styles from "@/styles/Page.module.css"

function UsersPage() {

    return (
        <Page title="Пользователи">
            <UserTabs />
            <div className={styles.page__content}>
                <Panel />
            </div>
        </Page>
    )
}

export default UsersPage

export async function getServerSideProps() {
    let response

    try {
        response = await api.loadUsers()
    } catch (error) {
        console.log("myerror: ", error)
        return {
            notFound: true
        }
    }

    return {
        props: {
            fallback: {
                "/api/users?page=1&_order[id]=desc": response.data
            }
        }
    }
}