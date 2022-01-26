
import * as api from "@/api/users"
import { Page } from "@/components/page"
import { Tabs as UserTabs } from "@/components/users/tabs"
import { UserView } from "@/components/users/view"
import { ChangeNicknameDialog } from "@/components/users/dialogs/change-nickname"
import { ChangeRoleDialog } from "@/components/users/dialogs/change-role"
import { ChangeStatusDialog } from "@/components/users/dialogs/change-status"
import styles from "@/styles/Page.module.css"

function UserUpdatePage() {
    
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

export default UserUpdatePage

export async function getServerSideProps({ params:{ id } }) {
    let response

    try {
        response = await api.loadUser(id)
    } catch (error) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            fallback: {
                [`/api/users/${id}`]: response.data
            }
        }
    }
}