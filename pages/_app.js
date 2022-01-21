
import { SWRConfig } from 'swr'
import axios from 'axios'
import '@/styles/globals.css'
import '@/styles/block.css'
import '@/styles/form.css'
import '@/styles/icon.css'
import { ConfirmDialog } from "@/components/confirm-dialog"
import { Message } from '@/components/message'
import { InfoDialog } from "@/components/info-dialog"

async function fetcher(url) {
  const res = await axios.get(`http://127.0.0.1:8000${url}`, {
    withCredentials: true,
    headers: {
      accept: "application/json"
    }
  })
  return res.data
}

function MyApp({ Component, pageProps: { fallback, ...pageProps }}) {
  
  return (
    <>
      <SWRConfig value={{ 
          //fetcher, 
          fallback,
          revalidateIfStale: false,
          revalidateOnFocus: false,
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
