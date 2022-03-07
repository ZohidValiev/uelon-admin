
import { NextPage, GetServerSideProps } from "next"
import { getCsrfToken, getSession } from "next-auth/react"
import { Panel } from "@/components/common/panel"
import { Form } from "@/components/auth/login"
import { useRouter } from "next/router"
import { PageLoader } from "@/components/common/loaders/page-loader"
import { guestOnly } from "@/components/hoc"


type Props = {
    csrfToken: string
}

const LoginPage: NextPage<Props> = ({ csrfToken }) => {

    const { query: { error }, replace } = useRouter()
    
    return (
        <div className="containerCenter">
            <Panel 
                title="Войти" 
                shadow={true}
            >
                <Form 
                    action="/api/auth/callback/credentials"
                    csrfToken={csrfToken} 
                    error={Array.isArray(error) ? error[0] : error}
                />
            </Panel>
        </div>
    )
}

export default guestOnly<Props>(LoginPage, {
    spinner: PageLoader,
})


export const getServerSideProps: GetServerSideProps = async (context) => {
    const session   = await getSession(context)
    const csrfToken = await getCsrfToken(context)
    
    return {
      props: { 
          session,
          csrfToken 
        },
    }
}