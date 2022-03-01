
import { GetServerSideProps } from "next"
import { AuthNextPage } from "@/types/pages"
import { Page } from "@/components/common/page"
import { UserToolBar } from "@/components/users/tool-bar"
import { TableContainer } from "@/components/users/table"
import { Tabs as UserTabs } from "@/components/users/tabs"
import styles from "@/styles/Page.module.css"
import { CreateUserDialog } from "@/components/users/dialogs/create"
import { getSession } from "next-auth/react"
import { Roles } from "@/types/users"


const UsersPage: AuthNextPage = () => {
    
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

UsersPage.auth = {
    role: Roles.ROLE_ADMIN
}

export default UsersPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            session: await getSession(context)
        }
    }
}