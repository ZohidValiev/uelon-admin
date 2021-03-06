
import { FC } from "react"
import { Entity, getCategoryTitle, Locale } from "@/types/categories"
import styles from "@/styles/ViewGrid.module.css"


interface Props {
    category: Entity.Category
}

const CategoryView: FC<Props> = ({ category }) => {

    return (
        <div className={styles.viewGrid}>
            <div className={styles.viewGrid__name}>ID</div>
            <div className={styles.viewGrid__value}>{ category.id }</div>
            <div className={styles.viewGrid__name}>Название Uz</div>
            <div className={styles.viewGrid__value}>{ getCategoryTitle(category, Locale.UZ) }</div>
            <div className={styles.viewGrid__name}>Название Ru</div>
            <div className={styles.viewGrid__value}>{ getCategoryTitle(category, Locale.RU) }</div>
            <div className={styles.viewGrid__name}>Уровень вложенности</div>
            <div className={styles.viewGrid__value}>{ category.level }</div>
            <div className={styles.viewGrid__name}>Иконка</div>
            <div className={styles.viewGrid__value}>{ category.icon }</div>
            <div className={styles.viewGrid__name}>Статус</div>
            <div className={styles.viewGrid__value}>{ category.isActive ? "Активный" : "Неактивный" }</div>
            <div className={styles.viewGrid__name}>Позиция</div>
            <div className={styles.viewGrid__value}>{ category.position }</div>
            <div className={styles.viewGrid__name}>Есть дочернии элементы</div>
            <div className={styles.viewGrid__value}>{ category.hasChildren ? "Да" : "Нет" }</div>
        </div>
    )
}

export default CategoryView