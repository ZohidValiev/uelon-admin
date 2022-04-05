
import { FC, MouseEventHandler, useCallback } from "react"
import styles from "@/styles/Table.module.css"
import Actions from "./Actions"
import UserStatus from "./UserStatus"
import { useRouter } from "next/router"
import { Entity } from "@/types/users"


interface Props {
    ix: number
    user: Entity.User
}

const TableRow: FC<Props> = ({ ix, user }) => {

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
                <Actions user={user} />
            </td>
        </tr>
    )
}

export default TableRow