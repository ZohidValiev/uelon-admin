
import Link from "next/link"
import HomeLink from "./HomeLink"
import styles from "@/styles/HomeLink.module.css"


function HomeLinks() {
    return (
        <div className={styles.links}>
          <Link href="/users" passHref>
            <HomeLink>Пользователи</HomeLink>
          </Link>
          <Link href="/categories" passHref>
            <HomeLink>Категории</HomeLink>
          </Link>
        </div>
    )
}

export default HomeLinks