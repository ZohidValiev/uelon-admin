
import { SWRConfig } from 'swr'
import Script from "next/script"
import '@/styles/globals.css'
import '@/styles/block.css'
import '@/styles/form.css'
import '@/styles/icon.css'
import '@/styles/loading-bar.css'
import { ConfirmDialog } from "@/components/confirm-dialog"
import { Message } from '@/components/message'
import { InfoDialog } from "@/components/info-dialog"



function MyApp({ Component, pageProps: { fallback, ...pageProps }}) {
  
  return (
    <>
      <Script 
        src="/js/loading-bar.min.js"
        strategy="beforeInteractive"
      />
      <SWRConfig value={{ 
          //fetcher, 
          fallback,
        }}>
        <Component {...pageProps} />
      </SWRConfig>
      <ConfirmDialog />
      <Message />
      <InfoDialog />
    </>
  )
}

export default MyApp
