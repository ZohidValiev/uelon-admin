
import Link from "next/link"
import styles from "@/styles/Table.module.css"
import { useRouter } from "next/router"


function TitleLink({ locale, category }) {

    const { query } = useRouter()

    const title = category.translations[locale].title

    if (category.level === 3) {
        return (
            <span className={styles["table__cell-link"]}>{title}</span>
        )
    } else {
        let path = ''

        if (category.level === 1) {
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