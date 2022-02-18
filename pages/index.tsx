
import {} from "next"
import Link from "next/link"
import Layout from '@/components/layout'
import { AuthNextPage } from "@/types/pages"


const Home: AuthNextPage = () => {
  return (
      <Layout header={null} footer={null}>
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
    role: "ROLE_MODERATOR"
}

export default Home