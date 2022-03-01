
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { AuthNextPage } from "@/types/pages"
import { Page } from "@/components/common/page"
import { Tabs as UserTabs } from "@/components/users/tabs"
import { UserView } from "@/components/users/view"
import { ChangeNicknameDialog } from "@/components/users/dialogs/change-nickname"
import { ChangeRoleDialog } from "@/components/users/dialogs/change-role"
import { ChangeStatusDialog } from "@/components/users/dialogs/change-status"
import styles from "@/styles/Page.module.css"
import { Roles } from "@/types/users"


const UserUpdatePage: AuthNextPage = () => {
    
    return (
        <Page title="Пользователи">
            <UserTabs />
            <div className={styles.page__content}>
                <UserView />
                <ChangeNicknameDialog />
                <ChangeRoleDialog />
                <ChangeStatusDialog />
            </div>
        </Page>
    )
}

UserUpdatePage.auth = {
    role: Roles.ROLE_ADMIN
}

export default UserUpdatePage

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            session: await getSession(context)
        }
    }
}