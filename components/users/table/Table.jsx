
import { callcSequenceIndex } from "@/utils/functions"
import TableRow from "./TableRow"
import EmptyRow from "./EmptyRow"
import styles from "@/styles/Table.module.css"


function Table({ users, page, totalItemsCount }) {

    return (
        <table className={styles.table}>
            <thead className={styles.table__head}>
                <tr>
                    <th className={styles.table__hcell}>#</th>
                    <th className={styles.table__hcell}>Email</th>
                    <th className={styles.table__hcell}>Ник</th>
                    <th className={styles.table__hcell}>Статус</th>
                    <th className={styles.table__hcell}>Действие</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 && <EmptyRow message="Нет пользователей"/>}
                {users.map((user, ix) => (
                    <TableRow 
                        key={user.id} 
                        ix={callcSequenceIndex(ix + 1, page, totalItemsCount)} 
                        isLast={users.length == (ix + 1)}
                        user={user}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default Table
