import '../styles/globals.css'
import '@fontsource/readex-pro'
import '@fontsource/noto-sans'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { DAppProvider } from '@usedapp/core'

const config = {
  autoConnect: false
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DAppProvider config={config}>
        <Component {...pageProps} />
      </DAppProvider>
    </ChakraProvider>
  )
}

export default MyApp
