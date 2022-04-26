import EnvironmentVirtual from "../environment/EnvironmentVirtual"
import { useEffect, useState } from "react";
import { useTranstation } from "../hooks/useTranslations"
import Head from "next/head";
import { useSceneBabylon } from "../contexts/useSceneBabylon";
import { Flex } from "@chakra-ui/react";
import GameLoading from "../components/GameLoading";

export default function Ambiente({ lang }) {
  const [clickStatus, setClickStatus] = useState(true)
  const { language, setLanguage, translatedWord } = useTranstation()
  useEffect(() => {
    setLanguage(lang)
  }, [])

  return (
    (language == lang) &&
    <>
      {translatedWord.loading &&
        <>
          <GameLoading />
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

