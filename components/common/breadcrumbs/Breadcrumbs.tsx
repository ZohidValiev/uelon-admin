
import { FC } from "react"
import styles from "@/styles/Breadcrumbs.module.css"


interface Props {
    links: string[]
}

const Breadcrumbs: FC<Props> = ({ links }) => {

    let content = ''

    links.forEach((link, ix) => {
        if (ix > 0) {
            content += ' / '
        }
        content += link
    })


    return (
        <div className={styles.breadcrumbs}>
            {content}
        </div>
    )
}

export default Breadcrumbs