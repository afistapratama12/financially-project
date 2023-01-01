import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AppWrapper } from '@/src/context/AppContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </ChakraProvider>
  )
}
