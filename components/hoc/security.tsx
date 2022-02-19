
import { ComponentType, useEffect } from "react"
import { useRouter} from "next/router"
import { NextPage } from "next"
import { useSession } from "@/hooks/session"


type GuestOnyOptions = {
    // A path, where a user will be redirected
    path?: string
    // if true will use a replace, if false will use a push
    replace?: boolean
    // A companent for spinning preview
    spinner?: ComponentType
}

export function guestOnly<P = {}>(
    Page: NextPage<P>, 
    { path = "/", replace = true, spinner }: GuestOnyOptions
): NextPage<P> {

    const Wrapper: NextPage<P> = (props: P) => {
        const router = useRouter()
        const { status } = useSession()

        useEffect(() => {
            if (status.authenticated) {
                if (replace) {
                    router.replace(path)
                } else {
                    router.push(path)
                }
            }
        }, [status.authenticated])

        if (status.authenticated || status.loading) {
            if (spinner) {
                const Spinner = spinner
                return (
                    <Spinner />
                )
            }

            return null
        }

        return (
            <Page {...props}/>
        )
    }

    return Wrapper
}