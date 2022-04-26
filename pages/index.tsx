import EnvironmentVirtual from "../environment/EnvironmentVirtual"
import { useEffect, useState } from "react";
import { useTranstation } from "../hooks/useTranslations"
import Head from "next/head";
import { useSceneBabylon } from "../contexts/useSceneBabylon";
import { Flex } from "@chakra-ui/react";

export default function Ambiente({ lang }) {
  const [clickStatus, setClickStatus] = useState(true)
  const { language, setLanguage, translatedWord } = useTranstation()
  useEffect(() => {
    setLanguage(lang)
  }, [])
  const { sceneRef } = useSceneBabylon()

  return (
    (language == lang) &&
    <>
      <Head>
        <title>NextJs | Bayblon Demo</title>
      </Head>
      {translatedWord.loading &&
        <>
          <EnvironmentVirtual
            clickStatus={clickStatus}
          />
        </>
      }
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  let { lang } = ctx.query

  return {
    props: {
      lang
    }, // will be passed to the page component as props
  }
}

