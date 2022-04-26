import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import { useLocalStorage } from '../utils/useLocalStorage'

interface MusicProviderProp {
  children: ReactNode
}

interface MusicContextProps {
  startMusic: () => void
  pauseMusic: () => void
  musicRef: any
  musicStatus: boolean
  startCountSecs: () => void
  counterSecs: number
  stopCountPoints: () => void
  startCountSecsVideo: () => void
  minutsVideo: string
}

export const MusicContext = createContext({} as MusicContextProps)

export function MusicProvider({ children }: MusicProviderProp) {
  const [musicStatus, setMusicStatus] = useLocalStorage('musicStatus', true)
  const musicRef = useRef(null)

  const [counterSecs, setCountSecs] = useState(0);

  const [counterSecsVideo, setCountSecsVideo] = useState(0);


  const startCountSecsVideo = () => setCountSecsVideo(counterSecsVideo + 1);
  const stopCountSecsVideo  = () => setCountSecs(0);

  const startCountSecs = () => setCountSecs(counterSecs + 1);
  const stopCountPoints  = () => setCountSecs(0);

  function secondsToSecAndMins(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
    
  const minutsVideo = secondsToSecAndMins(String(counterSecsVideo))
  function startMusic() {
    musicRef.current?.play()
    // som 20%
    musicRef.current.volume = 0.2
    setMusicStatus(true)
  }

  function pauseMusic() {
    musicRef.current?.pause()
    setMusicStatus(false)
  }

  return(
    <MusicContext.Provider value={{
      startMusic,
      pauseMusic,
      musicRef,
      musicStatus,
      startCountSecs,
      counterSecs,
      startCountSecsVideo,
      stopCountPoints,
      minutsVideo
    }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)

  return context
}
