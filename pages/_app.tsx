
import { SessionProvider, signIn } from "next-auth/react"
import { SWRConfig } from 'swr'
import '@/styles/globals.css'
import '@/styles/block.css'
import '@/styles/form.css'
import '@/styles/icon.css'
import '@/styles/loading.css'
import { ConfirmDialog } from "@/components/confirm-dialog"
import { Message } from '@/components/message'
import { InfoDialog } from "@/components/info-dialog"
import { InfoLoader } from "@/components/loaders/info-loader"
import { m_useSWRCompleted } from "@/hooks/swr-completed"
import { useSession } from "@/hooks/session"
import { AuthType, AuthNextPage } from "@/types/pages"
import { NextPage } from "next"
import { PageLoader } from "@/components/loaders/page-loader"
import { FC, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AuthUser, hasPermission } from "@/types/users"


type Props = {
  Component: AuthNextPage | NextPage
  pageProps: {
    [key: string]: any
  }
}

function MyApp({ Component, pageProps: { fallback, session, ...pageProps }}: Props) {

  let auth: AuthType | null = null
  
  if ("auth" in Component) {
    auth = Component.auth
  }

  return (
    <>
        <SessionProvider session={session}>
          {/* <SWRConfig value={{ fallback }}> */}
          <SWRConfig 
            value={{ 
              //use: [m_useSWRCompleted] 
            }}
          >
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
      const user = session.user as AuthUser

      if (hasPermission(user, auth.role)) {
        setAccessGranted(true)
      }  else {
        router.replace("/auth/access-denied")
      }
    }
  })

  if (accessGranted) {
    return (
      <>{children}</>
    )
  }

  return (
    <PageLoader />
  )
}
