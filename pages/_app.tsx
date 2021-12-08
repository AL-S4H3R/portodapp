import '../styles/globals.css'
import '@fontsource/readex-pro'
import '@fontsource/noto-sans'
import type { AppProps } from 'next/app'
import { DAppProvider, Config, Polygon } from '@usedapp/core'
import { ChakraProvider } from '@chakra-ui/react'

const config: Config = {
  // networks: [Polygon, ]
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
    </DAppProvider>
  )
}

export default MyApp
