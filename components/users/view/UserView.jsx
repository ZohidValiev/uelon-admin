
import UserStatus from "./UserStatus"
import UserViewItem from "./UserViewItem"
import styles from "@/styles/ViewGrid.module.css"

function UserView({ user, onClickNickname, onClickEmail, onClickStatus, onClickRole }) {
    
    const items = [
        { title: "ID", value: user.id },
        { title: "Псевдоним", value: user.nickname, onClick: onClickNickname },
        { title: "Email", value: user.email, onClick: onClickEmail },
        { title: "Статус", value: <UserStatus status={user.status} />, onClick: onClickStatus },
        { 
            title: "Роль", 
            value: user.roles.filter((role) => role !== "ROLE_GUEST").join(", "), 
            onClick: onClickRole 
        },
        { title: "Дата создания", value: user.createTimeFormated },
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