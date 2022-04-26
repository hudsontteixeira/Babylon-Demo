import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { useDisclosure, } from '@chakra-ui/react'

interface ModalEventProviderProp {
  children: ReactNode
}

interface  ModalEventPContextProps {
  openLogin: boolean
  setOpenLogin: Dispatch<SetStateAction<boolean>>
  openCadastro: boolean
  setOpenCadastro: Dispatch<SetStateAction<boolean>>
  openSentEmail: boolean
  setOpenSentEmail: Dispatch<SetStateAction<boolean>>
  openEsqueci: boolean
  setOpenEsqueci: Dispatch<SetStateAction<boolean>>
  openCongCadastro: boolean
  setOpenCongCadastro: Dispatch<SetStateAction<boolean>>
  openContact: boolean
  setOpenContact: Dispatch<SetStateAction<boolean>>
  openCarrossel: boolean
  setOpenCarrossel: Dispatch<SetStateAction<boolean>>
  indexCarrossel: number
  setIndexCarrossel: Dispatch<SetStateAction<number>>
}

export const ModalEventContext = createContext({} as ModalEventPContextProps)

export function ModalEventProvider({ children }: ModalEventProviderProp) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openCadastro, setOpenCadastro] = useState(false);
  const [openSentEmail, setOpenSentEmail] = useState(false);
  const [openEsqueci, setOpenEsqueci] = useState(false);
  const [openCongCadastro, setOpenCongCadastro] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openCarrossel, setOpenCarrossel] = useState(false);
  const [indexCarrossel, setIndexCarrossel] = useState(0)

  return(
    <ModalEventContext.Provider value={{
      openLogin,
      setOpenLogin,
      openCadastro,
      setOpenCadastro,
      openSentEmail,
      setOpenSentEmail,
      openEsqueci,
      setOpenEsqueci,
      openCongCadastro,
      setOpenCongCadastro,
      openContact,
      setOpenContact,
      openCarrossel,
      setOpenCarrossel,
      indexCarrossel,
      setIndexCarrossel,
    }}>
      {children}
    </ModalEventContext.Provider>
  )
}

export function useModalEvent() {
  const context = useContext(ModalEventContext)

  return context
}
