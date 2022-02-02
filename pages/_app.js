
import { SessionProvider } from "next-auth/react"
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



function MyApp({ Component, pageProps: { fallback, session, ...pageProps }}) {
  
  return (
    <>
        <SessionProvider session={session}>
          <SWRConfig value={{ fallback }}>
            <Component {...pageProps} />
          </SWRConfig>
        </SessionProvider>
      {/* <ConfirmDialog />
      <Message />
      <InfoDialog />
      <InfoLoader /> */}
    </>
  )
}

export default MyApp
