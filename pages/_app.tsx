import { ChakraProvider } from '@chakra-ui/react'
import "../styles/global.scss"
import { AppProps } from 'next/app'
import { theme } from '../styles/theme'
import { MusicProvider } from '../contexts/useMusic';
import { SceneBabylonProvider } from "../contexts/useSceneBabylon"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SceneBabylonProvider>
        <MusicProvider>
          <Component {...pageProps} />
        </MusicProvider>
      </SceneBabylonProvider>
    </ChakraProvider>
  )
}

export default MyApp
