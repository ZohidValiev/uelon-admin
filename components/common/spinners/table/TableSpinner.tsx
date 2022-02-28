
import { FC, memo } from "react"
import { arrayRepeat } from "@/utils/functions"
import styles from "@/styles/TableSpinner.module.css"

interface Props {
    columns: number
    rows: number
}

const TableSpinner: FC<Props> = ({ columns, rows }) => {

    const _columns = arrayRepeat<undefined>(columns, undefined)
    const _rows    = arrayRepeat<undefined>(rows, undefined)

    return (
        <table className={styles.tableSpinner}>
            <thead>
                <tr>
                    { _columns.map((value, ix) => (
                        <td key={ix} className={styles.tableSpinner__hcell}></td>
                    )) }
                </tr>
            </thead>
            <tbody>
                { _rows.map((value, ix) => (
                    <tr key={ix} className={styles.tableSpinner__row}>
                        { _columns.map((value, ix) => (
                            <td key={ix} className={styles.tableSpinner__cell}></td>
                        )) }
                    </tr>
                )) }
            </tbody>
        </table>
    )
}

export default memo(TableSpinner)