
import { useCallback, memo } from "react"
import { useRouter } from "next/router"
import TitleLink from "./TitleLink"
import styles from "@/styles/Table.module.css"
import ActionIcon from "./ActionIcon"
import StatusIcon from "./StatusIcon"

function TableRow({ ix, isLast, category, onUpdate, onUp, onDown, onDelete }) {

    const router = useRouter()    

    function getQuery() {
        const { rootId, parentId } = router.query
        const query = {
            id: category.id
        }

        if (rootId) {
            query.rootId = rootId
        }

        if (parentId) {
            query.parentId = parentId
        }

        return query
    }

    const updateHandler = useCallback(() => {
        onUpdate(category)
    }, [category])

    const viewHandler = useCallback(() => {
        router.push({
            pathname: "/categories/view/[id]",
            query: getQuery(),
        })
    }, [])

    const positionUpHandler = useCallback(() => {
        onUp(category)
    }, [category])

    const positionDownHandler = useCallback(() => {
        onDown(category)
    }, [category])

    const deleteHandler = useCallback(() => {
        onDelete(category)
    }, [category])

    return (
        <tr className={styles.table__row}>
            <td className={`${styles.table__cell} ${styles.table__cell_center}`}>
                {ix}
            </td>
            <td className={`${styles.table__cell} ${styles.table__cell_reset} ${styles.table__cell_left} ${styles["table__cell_font-bold"]}`}>
                <TitleLink locale="UZ" category={category} />
            </td>
            <td className={`${styles.table__cell} ${styles.table__cell_reset} ${styles.table__cell_left} ${styles["table__cell_font-bold"]}`}>
                <TitleLink locale="RU" category={category} />
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
                                      onClick={positionUpHandler} />
                    }
                    {isLast
                        ? <span className="icon-action__item icon-action__item_empty"></span>
                        : <ActionIcon icon="arrowDown" 
                                      title="Опустить"
                                      onClick={positionDownHandler} />
                    }
                    <ActionIcon icon="eye" 
                                title="Просмотреть" 
                                onClick={viewHandler} />
                    <ActionIcon icon="pencil" 
                                title="Редактировать" 
                                onClick={updateHandler} />
                    {category.hasChildren
                        ? <span className="icon-action__item icon-action__item_empty"></span>
                        : <ActionIcon icon="trash" 
                                      title="Удалить"
                                      onClick={deleteHandler} />
                    }
                </div>
            </td>
        </tr>
    )
}

export default memo(TableRow)