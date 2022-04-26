import { useLocalStorage } from "../utils/useLocalStorage";
import PtTranslation from "../translations/pt-BR.json"
import EnTranslation from "../translations/en-US.json"

import { useEffect, useState } from "react";
import { TranslationTypes } from "../@types/translations";

type LanguageTypes = "pt-BR" | "en-US" | "es-ES"

export function useTranstation() {
  const [language, setLanguage] = useLocalStorage<LanguageTypes>("language", "en-US");
  const [translatedWord, setTranslatedWord] = useState({} as TranslationTypes)

  useEffect(() => {
    switch (language) {
      case "pt-BR":
        setTranslatedWord(PtTranslation)
        break;
      case "en-US":
        setTranslatedWord(EnTranslation)
        break;
      default:
        break;
    }
  }, [language])

  return {
    translatedWord,
    language,
    setLanguage
  }
}
