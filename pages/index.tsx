
import Link from "next/link"
import { Layout } from '@/components/layout'
import { AuthNextPage } from "@/types/pages"
import { Roles } from "@/types/users"


const Home: AuthNextPage = () => {
  return (
      <Layout footer={null}>
        <Link href="/users">
          <a>Пользователи</a>
        </Link>
        <br/>
        <Link href="/categories">
          <a>Категории</a>
        </Link>
      </Layout>
  )
}

Home.auth = {
    role: Roles.ROLE_MODERATOR
}

export default Home