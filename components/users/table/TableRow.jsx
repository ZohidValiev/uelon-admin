
import styles from "@/styles/Table.module.css"
import Actions from "./Actions"
import UserStatus from "./UserStatus"
import { useCallback } from "react"
import { useRouter } from "next/router"


function TableRow({ ix, user }) {

    const router = useRouter()

    const handleUpdate = useCallback(() => {
        router.push(`/users/update/${user.id}`)
    }, [user])

    return (
        <tr className={styles.table__row}>
            <td className={[styles.table__cell, styles.table__cell_center].join(" ")}>
                {ix}
            </td>
            <td className={[styles.table__cell, styles["table__cell_font-bold"]].join(" ")}>
                {user.email}
            </td>
            <td className={[styles.table__cell, styles["table__cell_font-bold"]].join(" ")}>
                {user.nickname}
            </td>
            <td className={[styles.table__cell, styles.table__cell_center].join(" ")}>
                <UserStatus status={user.status}/>
            </td>
            <td className={styles.table__cell}>
                <Actions 
                    onUpdate={handleUpdate}
                />
            </td>
        </tr>
    )
}

export default TableRow