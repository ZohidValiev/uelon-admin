
import { FC, HTMLProps } from "react"
import styles from "@/styles/Table.module.css"

interface Props extends HTMLProps<HTMLTableCellElement> {
    message: string
}

const EmptyRow: FC<Props> = ({ message }) => {

    const classes = [
        styles.table__row,
        styles.table__row_empty,
    ]
    const tdClasses = [
        styles.table__cell,
        styles["table__cell_font-bold"],
        styles.table__cell_empty,
    ]

    return (
        <tr className={classes.join(" ")}>
            <td className={tdClasses.join(" ")} colSpan={8}>
                {message}
            </td>
        </tr>
    )
}

export default EmptyRow