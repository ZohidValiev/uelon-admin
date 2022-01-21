
import styles from "@/styles/Table.module.css"

function EmptyRow({ message }) {
    return (
        <tr className={`${styles.table__row} ${styles.table__row_empty}`}>
            <td className={`${styles.table__cell} ${styles["table__cell_font-bold"]} ${styles.table__cell_empty}`} colSpan="8">
                {message}
            </td>
        </tr>
    )
}

export default EmptyRow