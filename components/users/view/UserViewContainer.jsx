
import { useUser } from "@/hooks/users"
import { useRouter } from "next/router"
import UserView from "./UserView"
import { _changeNicknameDialog } from "@/components/users/dialogs/change-nickname"
import { _changeRoleDialog } from "@/components/users/dialogs/change-role"
import { _changeStatusDialog } from "@/components/users/dialogs/change-status"
import { _info } from "@/components/info-dialog"


function UserViewContainer() {
    const { query } = useRouter()
    const { data:user, error, mutate } = useUser(query.id)

    const handleClickNickname = () => {
        _changeNicknameDialog.open(user, {
            onOk(user) {
                mutate(user, false)
            },
            onError(error) {
                _info.openError("Ошибка", "error")
            },
        })
    }

    const handleClickRole = () => {
        _changeRoleDialog.open(user, {
            onOk(user) {
                mutate(user, false)
            },
            onError(error) {
                _info.openError("Ошибка", "error")
            }
        })
    }

    const handleClickStatus = () => {
        _changeStatusDialog.open(user, {
            onOk(user) {
                mutate(user, false)
            },
            onError(error) {
                _info.openError("Ошибка", "error")
            }
        })
    }

    if (error) {
        return "error"
    }

    return (
        <UserView
            user={user}
            onClickNickname={handleClickNickname}
            onClickRole={handleClickRole}
            onClickStatus={handleClickStatus}
        />
    )
}

export default UserViewContainer