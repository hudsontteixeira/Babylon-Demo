import { useTranstation } from '../hooks/useTranslations'
import styles from '../styles/newLoader.module.scss'
import { Center, Spinner, VStack } from '@chakra-ui/react'

export default function GameLoading() {
  const { language, setLanguage, translatedWord } = useTranstation()

  return (
    <>
      <Center id="loadingScreen" w="100%" h="100vh" position="absolute" className={styles.LoaderBody}>
        <VStack>
          <Spinner
            thickness='16px'
            speed='1.5s'
            emptyColor='gray.300'
            color='blue.500'
            size='500px'
          />
          <p className="animate-fading" style={{ color: "#ffffff", marginTop: "0px" }} >{translatedWord.loading}</p>
          <p id="loadingScreenPercent"></p>
        </VStack>
      </Center>
    </>
  )
}