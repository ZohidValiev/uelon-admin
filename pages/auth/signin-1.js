
import { signIn, signOut, useSession } from "next-auth/react"

function SignIn() {

    const session = useSession()
    console.log("session: ", session)

    if (session.status === "authenticated") {
        return (
            <button onClick={() => signOut()}>Signout</button>    
        )
    }

    return (
        <button onClick={() => signIn()}>Sign in</button>
    )
}

export default SignIn