
import { FC, useEffect, useCallback } from "react"
import { useUser } from "@/hooks/users"
import { useRouter } from "next/router"
import UserView from "./UserView"
import { ViewGridSpinner } from "@/components/spinners/view-grid"
import { _changeNicknameDialog } from "@/components/users/dialogs/change-nickname"
import { _changeRoleDialog } from "@/components/users/dialogs/change-role"
import { _changeStatusDialog } from "@/components/users/dialogs/change-status"
import { _info } from "@/components/info-dialog"
import { _infoLoader } from "@/components/loaders/info-loader"


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
            onOK(user) {
                mutate(user, false)
            },
            onError(error) {
                _info.openError("Ошибка", "error")
            },
        })
    }, [user])

    const handleClickRole = useCallback(() => {
        _changeRoleDialog.open(user, {
            onOK(user) {
                mutate(user, false)
            },
            onError(error) {
                _info.openError("Ошибка", "error")
            }
        })
    }, [user])

    const handleClickStatus = useCallback(() => {
        _changeStatusDialog.open(user, {
            onOK(user) {
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