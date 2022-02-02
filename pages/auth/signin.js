
import { getCsrfToken } from "next-auth/react"
import { Panel } from "@/components/panel"
import { Form } from "@/components/auth/signin"

function SignInPage({ csrfToken }) {

    return (
        <div className="containerCenter">
            <Panel title="Войти">
                <Form
                    fields={{}}
                    errors={{}}
                    csrfToken={csrfToken}
                />
            </Panel>
        </div>
    )
}

export default SignInPage


export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    return {
      props: { csrfToken },
    }
  }