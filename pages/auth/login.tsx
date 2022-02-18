
import { NextPage, GetServerSideProps } from "next"
import { getCsrfToken } from "next-auth/react"
import { Panel } from "@/components/panel"
import { Form } from "@/components/auth/login"
import { useRouter } from "next/router"

type Props = {
    csrfToken: string
}

const LoginPage: NextPage<Props> = ({ csrfToken }) => {

    const { query: { error } } = useRouter()
    
    return (
        <div className="containerCenter">
            <Panel title="Войти">
                { error ? "Неправильный email или пароль" : null}
                <Form 
                    action="/api/auth/callback/credentials"
                    csrfToken={csrfToken} 
                />
            </Panel>
        </div>
    )
}

export default LoginPage


export const getServerSideProps: GetServerSideProps = async (context) => {
    const csrfToken = await getCsrfToken(context)
    
    return {
      props: { csrfToken },
    }
}