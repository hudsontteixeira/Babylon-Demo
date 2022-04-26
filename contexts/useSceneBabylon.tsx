import { createContext, ReactNode, useContext } from 'react'
import { useState } from 'react'
import { Scene } from "@babylonjs/core"

interface SceneBabylonProviderProp {
  children: ReactNode
}

interface SceneBabylonTypes {
  sceneRef: Scene
  setSceneRef: any
}

export const SceneBabylonContext = createContext({} as SceneBabylonTypes)

export function SceneBabylonProvider({ children }: SceneBabylonProviderProp) {

  const [sceneRef, setSceneRef] = useState(null)

  return (
    <SceneBabylonContext.Provider value={{
      sceneRef,
      setSceneRef
    }}>
      {children}
    </SceneBabylonContext.Provider>
  )
}

export function useSceneBabylon() {
  const context = useContext(SceneBabylonContext)

  return context
}
