
import { FC, MouseEventHandler } from "react"
import * as users from "@/types/users"
import UserRole from "./UserRole"
import UserStatus from "./UserStatus"
import UserViewItem from "./UserViewItem"
import styles from "@/styles/ViewGrid.module.css"

interface Props {
    user: users.Entity.User
    onClickNickname: MouseEventHandler
    onClickEmail: MouseEventHandler
    onClickStatus: MouseEventHandler
    onClickRole: MouseEventHandler
}

const UserView: FC<Props> = ({ user, onClickNickname, onClickEmail, onClickStatus, onClickRole }) => {
    
    const items = [
        { title: "ID", value: user.id },
        { title: "Псевдоним", value: user.nickname, onClick: onClickNickname },
        { title: "Email", value: user.email, onClick: onClickEmail },
        { title: "Статус", value: <UserStatus status={user.status} />, onClick: onClickStatus },
        { title: "Роль", value: <UserRole roles={user.roles as users.Roles[]} />, onClick: onClickRole },
        { title: "Дата создания", value: user.createTime },
    ]

    return (
        <div className={styles.viewGrid}>
            {items.map((item, ix) => {
                return (
                    <UserViewItem 
                        key={ix}
                        title={item.title}
                        value={item.value}
                        onClick={item.onClick}
                    />
                )
            })}
        </div>
    )
}

export default UserView