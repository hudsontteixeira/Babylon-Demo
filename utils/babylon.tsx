
import * as Constants from '../components/constants'
import { Scene, Vector3 } from "@babylonjs/core"

export function teleportToStand(sceneRef: Scene, standId: number, delay: number = 0) {
    setTimeout(() => {
        console.log('useEffect.sceneRef', sceneRef)

        const MESH_NAME = `${Constants.MESH_NAME_COLLIDER_TELEPORT}${standId}`
        console.log("Pavilion1.MESH_NAME", MESH_NAME)

        var meshTeleportStand = sceneRef.getMeshByName(MESH_NAME)
        console.log('meshTeleportStand', meshTeleportStand)
        sceneRef.activeCamera.position = new Vector3(meshTeleportStand.position.x, meshTeleportStand.position.y, meshTeleportStand.position.z)
        {/*// @ts-ignore*/}
        sceneRef.activeCamera.rotation = new Vector3(meshTeleportStand.rotation.x, meshTeleportStand.rotation.y, meshTeleportStand.rotation.z)
    }, delay);
}