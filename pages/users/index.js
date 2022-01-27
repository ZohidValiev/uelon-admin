
import * as api from "@/api/users"
import { Page } from "@/components/page"
import { UserToolBar } from "@/components/users/tool-bar"
import { TableContainer } from "@/components/users/table"
import { Tabs as UserTabs } from "@/components/users/tabs"
import styles from "@/styles/Page.module.css"
import { CreateUserDialog } from "@/components/users/dialogs/create"

function UsersPage() {

    return (
        <Page title="Пользователи">
            <UserTabs />
            <div className={styles.page__content}>
                <UserToolBar />
                <TableContainer />
                <CreateUserDialog />
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
        return {
            notFound: true
        }
    }
    // console.log("data: ", response.data)
    return {
        props: {
            fallback: {
                "/api/users?page=1&_order[id]=desc": response.data
            }
        }
    }
}