import { CloseIcon } from "@chakra-ui/icons"
import { Box, Center, HStack, Icon, Image, Text, Tooltip, useMediaQuery } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import NoSSR from "react-no-ssr"
import { useModal } from "../contexts/useModal"
import { useMusic } from "../contexts/useMusic"
import { useChatContext } from "../contexts/chatContext"
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import * as Constants from "../utils/constants";
import { AnalyticsEnvironmentStatusEnum, AnalyticsEnvironmentTypeEnum } from "../models/analyticsModels"
import { useEnviroment3d } from "../hooks/Environment3dOnClickEventsContext"
import { useSceneBabylon } from "../contexts/useSceneBabylon"
import { Scene, Engine } from "@babylonjs/core"
import { parseCookies, setCookie } from 'nookies'
import { useTranstation } from "../hooks/useTranslations"


export default function AmbientController({buttonMovebyClick}) {
  const {language, setLanguage, translatedWord} = useTranstation()
  const { pauseMusic, startMusic, musicRef, musicStatus } = useMusic()
  const {isVisibleEnvControl, isVisibleStandControl, isHighlightedStandControl, isHighlightedEnvControl, setTutorialModalState, musicAlreadyPlaying, setMusicAlreadyPlaying} = useEnviroment3d()
  const { setEnableQA } = useChatContext()
  const user = {id:1}
  const { modalVideoIsOpen, setTeleportIsOpen } = useModal()
  const [showRooms, setShowRooms] = useState(false)
  const [isSmalerThan750h] = useMediaQuery("(max-height: 750px)")
  const [clickStatus, setClickStatus] = useState(true)
  const { sceneRef } = useSceneBabylon()
 
  
  
    

  
  
  

  function UnlockMusic(sceneRef: Scene){
    if (sceneRef === null)
      return;
    Engine.audioEngine.unlock();
    var music = sceneRef.getSoundByName("Music")
    setMusicAlreadyPlaying(false)
    music.play()
    setCookie(null, 'musicPlaying', 'true', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }
  
  
  


  function StopMusic(sceneRef: Scene){
    if (sceneRef === null)
      return;
    var music = sceneRef.getSoundByName("Music")
    setMusicAlreadyPlaying(true)
    music.pause()
    setCookie(null, 'musicPlaying', 'false', {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }
  
  function butmap(){
    if(showRooms === false){
      setShowRooms(true)
    }
    if(showRooms === true){
      setShowRooms(false)
    }
  }

  function changeMoviment(){
    setClickStatus(!clickStatus)
     buttonMovebyClick()
  }

  if (typeof window !== "undefined") {
    window.addEventListener('keydown', function() {  
      if (musicStatus === true) {
        startMusic()
      } 
      if (musicStatus === false) {
        pauseMusic()
      } 
    }, {once: true})
  }  

  

  return (
    <Box
      mt={["50px","100px","100px","100px"]}
      // mr={openChat?["300px","350px","450px","420px","500px"]:"1"}
      mr='4'
      display={modalVideoIsOpen ? 'none' : 'block'}
      position="relative">
      <audio
        ref={musicRef}
        src="/sounds/ambient-sound.mp3"
        loop
      />
        <Center pointerEvents="all">
        <HStack visibility={isVisibleStandControl? "visible" : "hidden"} justify='space-between'>
          <Center bg="#FF946E" w="45px" h="45px" borderRadius="100%" >
          <a
            href="#"
            onClick={() => {setTutorialModalState(false),setTeleportIsOpen(true)}}
            >
          <Image
            width="100%"
            height="60%"
            src="icons/stand-icon.svg"
            alt="stands"/></a>
          </Center>
        </HStack>
        
          <Center pointerEvents={isHighlightedEnvControl? "none":"all"} boxShadow = {isHighlightedEnvControl? "10px 9px 30px 9px #800080" : null} visibility={isVisibleEnvControl? "visible" : "hidden"} ml="5" bg="#EDEDED" w="160px" h="45px" borderRadius="30px" >
          <a href="#" onClick={() => butmap()}><Image mr="3" height="40%" src="icons/3d-map.svg" alt="mapa"/></a>
            <Text mr="3" color="#1C1C1C">|</Text>
            <NoSSR>
              {musicAlreadyPlaying == true && (
              <a href="#" id="music" onClick={() => UnlockMusic(sceneRef)}><Icon color="#1c1c1c" fontSize={25} as={FiVolumeX}/></a>
              )}
              {musicAlreadyPlaying == false && (
                <a href="#" onClick={() => StopMusic(sceneRef)}><Icon color="#1c1c1c" fontSize={25} as={FiVolume2}/></a>
              )}
            </NoSSR>
            <Text mr="3" ml="3" color="#1C1C1C">|</Text>
            <NoSSR>
          {clickStatus == true && (
            <Tooltip hasArrow label="Mudar para movimentação apenas por teclado" bg="orange.400">
              <a href="#" onClick={function(){changeMoviment()}}><Image width="100%" height="60%" src={clickStatus ? "icons/mouse-enable.svg"  : "icons/mouse-disable.svg"} alt="point"/></a>
            </Tooltip>
          )}
          {clickStatus == false && (
            <Tooltip hasArrow label="Mudar para movimentação por teclado e mouse" bg="orange.400">
            <a href="#" onClick={function(){changeMoviment()}}><Image width="100%" height="60%" src={clickStatus ? "icons/mouse-enable.svg"  : "icons/mouse-disable.svg"} alt="point"/></a>
            </Tooltip>
          )}
          </NoSSR>
          </Center>
          
        </Center>
        <Box pointerEvents="all" minW={isSmalerThan750h?"200px":"100px"} w={isSmalerThan750h?"100px":null}  position="relative" top="2"textAlign="center" visibility={!showRooms? 'hidden' : 'visible'} bg="#FFFFFF" color="#1c1c1c" borderRadius="36px">
          <Text  fontSize="18px" mt="2" fontWeight="bold">{translatedWord.goTo}… <CloseIcon  onClick={() => setShowRooms(false)}  ml="5" /></Text>
         
          <Center>
          <a  id="Lounge" onClick={()=> {setTutorialModalState(false),setShowRooms(false)}} href="#"><Image boxSize={isSmalerThan750h? "60px":"100px"} ml="5" mr="5" src="icons/pavillion.svg" alt="mapa"/></a>
          </Center>
          <Text  fontSize={isSmalerThan750h?"12px":"18px"}>{translatedWord.standsMap}</Text>
          
      </Box>
    </Box>
    )
}
