
import { useCallback, memo, FC } from "react"
import { useRouter } from "next/router"
import TitleLink from "./TitleLink"
import styles from "@/styles/Table.module.css"
import ActionIcon from "./ActionIcon"
import StatusIcon from "./StatusIcon"
import { Entity, Locale } from "@/types/categories"

export interface Callback {
    (category: Entity.Category): void
}

interface Props {
    ix: number
    isLast: boolean
    category: Entity.Category
    onUpdate: Callback
    onUp: Callback
    onDown: Callback
    onDelete: Callback
}

const TableRow: FC<Props> = ({ ix, isLast, category, onUpdate, onUp, onDown, onDelete }) => {

    const router = useRouter()    

    function getQuery() {
        const { rootId, parentId } = router.query
        const query = {
            id: category.id,
            rootId: null,
            parentId: null,
        }

        if (rootId && !Array.isArray(rootId)) {
            query.rootId = rootId
        }

        if (parentId && !Array.isArray(parentId)) {
            query.parentId = parentId
        }

        return query
    }

    const handleUpdate = useCallback(() => {
        onUpdate(category)
    }, [category])

    const handleView = useCallback(() => {
        router.push({
            pathname: "/categories/view/[id]",
            query: getQuery(),
        })
    }, [])

    const handlePositionUp = useCallback(() => {
        onUp(category)
    }, [category])

    const handlePositionDown = useCallback(() => {
        onDown(category)
    }, [category])

    const handleDelete = useCallback(() => {
        onDelete(category)
    }, [category])

    return (
        <tr className={styles.table__row}>
            <td className={`${styles.table__cell} ${styles.table__cell_center}`}>
                {ix}
            </td>
            <td className={`${styles.table__cell} ${styles.table__cell_reset} ${styles.table__cell_left} ${styles["table__cell_font-bold"]}`}>
                <TitleLink locale={Locale.UZ} category={category} />
            </td>
            <td className={`${styles.table__cell} ${styles.table__cell_reset} ${styles.table__cell_left} ${styles["table__cell_font-bold"]}`}>
                <TitleLink locale={Locale.RU} category={category} />
            </td>
            <td className={`${styles.table__cell} ${styles.table__cell_reset} ${styles.table__cell_left} ${styles["table__cell_font-bold"]}`}>
                {category.icon}
            </td>
            <td className={`${styles.table__cell} ${styles.table__cell_reset}`}>
                {/* <div className={styles["table__cell-icons"]}> */}
                <div className="icon-action">
                    <StatusIcon category={category} />
                </div>
                {/* </div> */}
            </td>
            <td className={`${styles.table__cell} ${styles.table__cell_center} ${styles["table__cell_font-bold"]}`}>
                {category.position}
            </td>
            <td className={`${styles.table__cell} ${styles.table__cell_reset}`}>
                <div className="icon-action">
                    {ix == 1
                        ? <span className="icon-action__item icon-action__item_empty"></span>
                        : <ActionIcon icon="arrowUp" 
                                      title="Поднять"
                                      onClick={handlePositionUp} />
                    }
                    {isLast
                        ? <span className="icon-action__item icon-action__item_empty"></span>
                        : <ActionIcon icon="arrowDown" 
                                      title="Опустить"
                                      onClick={handlePositionDown} />
                    }
                    <ActionIcon icon="eye" 
                                title="Просмотреть" 
                                onClick={handleView} />
                    <ActionIcon icon="pencil" 
                                title="Редактировать" 
                                onClick={handleUpdate} />
                    {category.hasChildren
                        ? <span className="icon-action__item icon-action__item_empty"></span>
                        : <ActionIcon icon="trash" 
                                      title="Удалить"
                                      onClick={handleDelete} />
                    }
                </div>
            </td>
        </tr>
    )
}

export default memo(TableRow)