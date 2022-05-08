
import { FC, useEffect, useCallback } from "react"
import { useUser } from "@/hooks/users"
import { useRouter } from "next/router"
import UserView from "./UserView"
import { ViewGridSpinner } from "@/components/common/spinners/view-grid"
import { _changeNicknameDialog } from "@/components/users/dialogs/change-nickname"
import { _changeRoleDialog } from "@/components/users/dialogs/change-role"
import { _changeStatusDialog } from "@/components/users/dialogs/change-status"
import { _info } from "@/components/common/info-dialog"
import { _infoLoader } from "@/components/common/loaders/info-loader"
import * as users from "@/types/users"


interface Props {}

const UserViewContainer: FC<Props> = () => {
    const { query } = useRouter()
    const { data:user, error, mutate, isLoading } = useUser(parseInt(query.id as string))

    useEffect(() => {
        if (isLoading) {
            _infoLoader.open()    
        } else {
            _infoLoader.close()
        }
    }, [isLoading])

    const handleClickNickname = useCallback(() => {
        _changeNicknameDialog.open(user, {
            onOK(id, nickname) {
                user.nickname = nickname
                mutate(user, false)
            },
            onError(error) {
                _info.openError("Ошибка", "error")
            },
        })
    }, [user])

    const handleClickRole = useCallback(() => {
        _changeRoleDialog.open(user, {
            onOK(id, role) {
                users.setUserRole(user, role)
                mutate(user, false)
            },
            onError(error) {
                _info.openError("Ошибка", "error")
            }
        })
    }, [user])

    const handleClickStatus = useCallback(() => {
        _changeStatusDialog.open(user, {
            onOK(id, status) {
                user.status = status
                mutate(user, false)
            },
            onError(error) {
                _info.openError("Ошибка", "error")
            }
        })
    }, [user])

    if (error) {
        return (
            <>{error}</>
        )
    }
    
    if (isLoading) {
        return (
            <ViewGridSpinner rows={6} />
        )
    }

    return (
        <UserView
            user={user}
            onClickEmail={null}
            onClickNickname={handleClickNickname}
            onClickRole={handleClickRole}
            onClickStatus={handleClickStatus}
        />
    )
}

export default UserViewContainer