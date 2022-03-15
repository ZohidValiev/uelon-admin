
import { SessionProvider, signIn } from "next-auth/react"
import { SWRConfig } from 'swr'
import '@/styles/globals.css'
import '@/styles/block.css'
import '@/styles/form.css'
import '@/styles/icon.css'
import '@/styles/loading.css'
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { Message } from '@/components/common/message'
import { InfoDialog } from "@/components/common/info-dialog"
import { InfoLoader } from "@/components/common/loaders/info-loader"
import { useSession } from "@/hooks/session"
import { AuthType, AuthNextPage } from "@/types/pages"
import { NextPage } from "next"
import { PageLoader } from "@/components/common/loaders/page-loader"
import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Auth, hasUserRole } from "@/types/users"
import { tokenStore } from "@/stores/token"


type Props = {
  Component: AuthNextPage | NextPage
  pageProps: {
    [key: string]: any
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps }}: Props) {

  let auth: AuthType | null = null
  
  if ("auth" in Component) {
    auth = Component.auth
  }

  return (
    <>
        <SessionProvider session={session}>
          <SWRConfig>
            { auth ? (
              <Auth auth={auth}>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            ) }
            <ConfirmDialog />
            <Message />
            <InfoDialog />
            <InfoLoader />
          </SWRConfig>
        </SessionProvider>
    </>
  )
}

export default MyApp

type AuthProps = {
  auth: AuthType
}

const Auth: FC<AuthProps> = ({ auth, children }) => {
  
  const router = useRouter()
  const [accessGranted, setAccessGranted] = useState(false)
  const { session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })
  
  useEffect(() => {
    if (status.authenticated) {
      //@ts-ignore
      tokenStore.setToken(session.accessToken, session.refreshToken)
      
      const user = session.user as Auth.User
      if (hasUserRole(user, (auth.role as unknown) as string)) {
        setAccessGranted(true)
      }  else {
        router.replace("/auth/access-denied")
      }
    }
  }, [status.authenticated, router])

  if (accessGranted) {
    return (
      <>{children}</>
    )
  }

  return (
    <PageLoader />
  )
}
