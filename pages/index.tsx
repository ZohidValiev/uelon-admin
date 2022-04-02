
import { HomeLinks } from "@/components/common/link"
import { AuthNextPage } from "@/types/pages"
import { Roles } from "@/types/users"
import { Page } from "@/components/page"
import styles from "@/styles/Page.module.css"


const Home: AuthNextPage = () => {
  return (
    <Page title="Главная">
      <div className={styles.page__content}>
        <HomeLinks />
      </div>
    </Page>
  )
}

Home.auth = {
    role: Roles.ROLE_MODERATOR
}

export default Home