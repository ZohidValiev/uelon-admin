
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
import { UserViewToolBar } from "@/components/users/view-tool-bar"
import * as users from "@/types/users"
import events from "@/events-bus"


interface Props {}

const UserViewContainer: FC<Props> = () => {
    const { query, push } = useRouter()
    const { data:user, error, mutate, isLoading, isValidating } = useUser(parseInt(query.id as string))

    useEffect(() => {
        return events.userDeleted.subscribe((id) => {
            push('/users')
        })
    }, [mutate])

    useEffect(() => {
        if (isLoading || isValidating) {
            _infoLoader.open()    
        } else {
            _infoLoader.close()
        }
    }, [isLoading, isValidating])

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
        <>
            <UserViewToolBar user={user} />
            <UserView
                user={user}
                onClickEmail={null}
                onClickNickname={handleClickNickname}
                onClickRole={handleClickRole}
                onClickStatus={handleClickStatus}
            />
        </>
    )
}

export default UserViewContainer