
import TableRow, { Callback } from "@/components/categories/table/TableRow"
import EmptyRow from "@/components/categories/table/EmptyRow"
import styles from "@/styles/Table.module.css"
import { FC } from "react"
import { Entity } from "@/types/categories"

interface Props {
    categories: Entity.Category[]
    onUpdate: Callback
    onUp: Callback
    onDown: Callback
    onDelete: Callback
}

const Table: FC<Props> = ({ categories, onUpdate, onUp, onDown, onDelete }) => {

    return (
        <table className={styles.table}>
            <thead className={styles.table__head}>
                <tr>
                    <th className={styles.table__hcell}>#</th>
                    <th className={styles.table__hcell}>Название Uz</th>
                    <th className={styles.table__hcell}>Название Ru</th>
                    <th className={styles.table__hcell}>Иконка</th>
                    <th className={styles.table__hcell}>Статус</th>
                    <th className={styles.table__hcell}>Позиция</th>
                    <th className={styles.table__hcell}>Действие</th>
                </tr>
            </thead>
            <tbody>
                {categories.length === 0 && <EmptyRow message="Нет категорий"/>}
                {categories.map((category, ix) => (
                    <TableRow 
                        key={category.id} 
                        ix={ix + 1} 
                        isLast={categories.length == (ix + 1)}
                        category={category} 
                        onUpdate={onUpdate}
                        onUp={onUp}
                        onDown={onDown}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default Table

