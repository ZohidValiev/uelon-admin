
import styles from "@/styles/Table.module.css"
import { FC } from "react"

interface Props {
    message: string
}

const EmptyRow: FC<Props> = ({ message }) => {

    const trClasses = [
        styles.table__row,
        styles.table__row_empty,
    ]
    const tdClasses = [
        styles.table__cell,
        styles["table__cell_font-bold"],
        styles.table__cell_empty,
    ]

    return (
        <tr className={trClasses.join(" ")}>
            <td className={tdClasses.join(" ")} colSpan={8}>
                {message}
            </td>
        </tr>
    )
}

export default EmptyRow