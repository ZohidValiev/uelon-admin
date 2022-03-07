
import Link from "next/link"
import styles from "@/styles/Table.module.css"
import { useRouter } from "next/router"
import { Entity, Level, Locale } from "@/types/categories"
import { FC } from "react"

interface Props {
    locale: Locale
    category: Entity.Category
}

const TitleLink: FC<Props> = ({ locale, category }) => {

    const { query } = useRouter()

    const title = category.translations[locale].title

    if (category.level === Level.LEVEL3) {
        return (
            <span className={styles["table__cell-link"]}>{title}</span>
        )
    } else {
        let path = ''

        if (category.level === Level.LEVEL1) {
            path = `/categories/${category.id}/children`
        } else {
            path = `/categories/${query.rootId}/children/${category.id}/children`
        }

        return (
            <Link href={path}>
                <a className={styles["table__cell-link"]}>{title}</a>
            </Link>
        )
    }
}

export default TitleLink