import { useEffect, useState } from 'react'
import SceneComponent from "../components/SceneComponent"
import GameLoading from '../components/GameLoading'
import * as BABYLON from "@babylonjs/core"
import { useMusic } from '../contexts/useMusic'
import { useSceneBabylon } from "../contexts/useSceneBabylon"
import { parseCookies, setCookie } from 'nookies'
import { Engine, Scene } from "@babylonjs/core"
import { useTranstation } from '../hooks/useTranslations'
import SidebarWithHeader from '../components/Sidebar'



export default function EnvironmentVirtual({ clickStatus }) {
  const { language, setLanguage, translatedWord } = useTranstation()

  //#region VARIABLES

  const { pauseMusic, musicRef } = useMusic()
  const { setSceneRef } = useSceneBabylon()
  const [sceneGlobal, setSceneGlobal] = useState(null);
  const [loadingBabylonScene, setLoadingBabylonScene] = useState(true);

  const musicPlaying = parseCookies().musicPlaying

  const [cameraGlobal, setCameraGlobal] = useState<BABYLON.FreeCamera>(null);
  const [onPointerObservableAdd, setOnPointerObservableAdd] = useState(null);

  var camera: BABYLON.FreeCamera = null
  var useBox, useRotationNotTarget, camSphere;
  var colision_stand1: BABYLON.AbstractMesh, colision_stand2: BABYLON.AbstractMesh, colisao_auditorium: BABYLON.AbstractMesh;
  var video_stand1, card_stand1, chat_stand1, link_site_stand1, pdf_stand1, colision_initial, colision_trigger_initial, video_auditorium; // vars to make highlights active
  var card_stand2, link_site_stand2, pdf_stand2
  var disc;
  var lookAtBtnAuditorium;
  var teleportAuditorium;
  var trg_loot_notebook;
  let music;
  const HIGHLIGHT_COLOR = "#26DDD8";
  const PATH_SCENE_BABYLON = "./assets/scene/scene.babylon"
  const BABYLON_ID_NAME = "babylon-scene"

  // UseEffect to make point n click active
  useEffect(() => {
    if (clickStatus) {
      pointclickMoviment(sceneGlobal, cameraGlobal)
    }
    else {
      // @ts-ignore
      keyboardMoviment(sceneGlobal, cameraGlobal)
    }
  }, [clickStatus])

  // useEffect to delay integration to loading assets
  useEffect(() => {
    if (sceneGlobal !== null) {
    }
  }, [sceneGlobal])

  useEffect(() => {
    if (sceneGlobal !== null) {
    }
  }, [sceneGlobal])


  function makeCameraCollision(camera: BABYLON.FreeCamera, scene: BABYLON.Scene) {
    scene.gravity = new BABYLON.Vector3(0, -0.15, 0);
    camera.checkCollisions = true
    camera.applyGravity = true
    camera.ellipsoid = new BABYLON.Vector3(1.0, 0.82, 1.0)
    camera.speed = 0.10
    camera.position = new BABYLON.Vector3(1, 1.2, 0)//camera position
    camera.rotation = new BABYLON.Vector3(-0.0044657201001599145, 8.319440534657161, 0)//camera rotation

  }

  function createCamSphere(camera: BABYLON.FreeCamera, scene: BABYLON.Scene) {
    camSphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameterY: 3, diameterX: 0.1 }, scene);
    camSphere.parent = camera;
    camSphere.visibility = 0;
  }


  function addObserverPointClick(scene: BABYLON.Scene, camera: BABYLON.FreeCamera) {

    if (scene === null || camera === null)
      return;
    // Point n click logic
    let sceneOnPointerObservableAdd = scene.onPointerObservable.add(function (pointerInfo) {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERPICK:
          let m = pointerInfo.pickInfo.pickedMesh;

          if (m.name === "col_floor_start" || m.name === "col_floor_auditorium" || m.name === "col_floor_pavilion") {
            if (m.name === "col_floor_pavilion") {
              disc.position.y = 4.9;
            }

            let position = pointerInfo.pickInfo.pickedPoint
            position.y += 1.55
            let direction = pointerInfo.pickInfo.ray.direction
            direction.y = 0
            let target = position.add(direction)
            let tempCamera = camera.clone("tempCamera")
            tempCamera.position = position
            // tempCamera.setTarget(target)
            let start = BABYLON.Quaternion.FromRotationMatrix(camera.getWorldMatrix())
            let end = BABYLON.Quaternion.FromRotationMatrix(tempCamera.getWorldMatrix())
            tempCamera.dispose()
            //change options
            useBox = false; //shows box transition instead of camera, but not with target animation
            useRotationNotTarget = false;


            // @ts-ignore
            let node = useBox ? box : camera;
            BABYLON.Animation.CreateAndStartAnimation("transition", node, "position", 60, 60, camera.globalPosition, position, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            if (useRotationNotTarget) {
              BABYLON.Animation.CreateAndStartAnimation("transition", node, "rotation", 30, 30, start.toEulerAngles(), end.toEulerAngles(), BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            } else {
              BABYLON.Animation.CreateAndStartAnimation("transition", node, "target", 6, 4, camera.getTarget(), target, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
            }

          }
          break;
      }
    });

    setOnPointerObservableAdd(sceneOnPointerObservableAdd)
    // Point n click logic finished
  }

  function pointclickMoviment(scene: BABYLON.Scene, camera: BABYLON.FreeCamera) {

    if (scene === null || camera === null)
      return;

    addObserverPointClick(scene, camera)
    addDiscForPointclickMoviment(scene)
    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
  }

  function keyboardMoviment(scene: BABYLON.Scene, camera: BABYLON.FreeCamera, removeDisc) {
    if (scene === null || camera === null)
      return;

    scene.onPointerObservable.remove(onPointerObservableAdd);

    if (removeDisc || removeDisc === undefined)
      scene.getMeshByName("disc1").dispose()

    camera.keysUp.push(87);
    camera.keysLeft.push(65);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    document.getElementById(BABYLON_ID_NAME).focus();
  }

  function addDiscForPointclickMoviment(scene: BABYLON.Scene) {

    if (scene === null)
      return
    // Disc created
    let texturesphere = new BABYLON.StandardMaterial("material1", scene);
    texturesphere.diffuseTexture = new BABYLON.Texture("./assets/cena_tutorial_v11/pointandclick_512.jpg", scene);
    texturesphere.alpha = 0.8;
    disc = BABYLON.MeshBuilder.CreateDisc('disc1', {}, scene);
    disc.rotation.x = (Math.PI / 2);
    disc.position.y = 0.05;
    disc.scaling = new BABYLON.Vector3(0.8, 0.8, 0.8);
    disc.isPickable = false;
    disc.material = texturesphere;
    // // console.log(disc)

    // Get the mouse position
    window.addEventListener("mousemove", function () {
      let pickResult = scene.pick(scene.pointerX, scene.pointerY);
      disc.position.x = pickResult.pickedPoint?.x;
      disc.position.z = pickResult.pickedPoint?.z;
    });
  }

  const onSceneReady = (scene: BABYLON.Scene) => {//when scene is ready
    onSceneReadySetup(scene)
    BABYLON.SceneLoader.Append(PATH_SCENE_BABYLON, "", scene, onSceneReadyImported, onSceneReadyLoading, onSceneReadyError)
    return scene
  }

  function onSceneReadyLoading(event: BABYLON.ISceneLoaderProgressEvent) {
    setTimeout(() => {
      setLoadingBabylonScene(false)
    }, 3000);
  }

  function MakeRunBetter(scene) {
    /* Make performance better */
    scene.autoClear = false
    scene.autoClearDepthAndStencil = false
    scene.blockMaterialDirtyMechanism = true
    scene.getAnimationRatio()
    scene.cleanCachedTextureBuffer();
  }

  function MeshStart(scene) {
    var teleportEnter = scene.getMeshByName("tel_iniciosala");
    teleportEnter.freezeWorldMatrix();
    var teleportEnterPosition = teleportEnter.position;
    var teleportEnterRotation = teleportEnter.rotation;
    camera.position = new BABYLON.Vector3(teleportEnterPosition.x, teleportEnterPosition.y, teleportEnterPosition.z);
    camera.rotation = new BABYLON.Vector3(teleportEnterRotation.x, teleportEnterRotation.y, teleportEnterRotation.z);
  }


  function onSceneReadyError(scene: BABYLON.Scene, message, exception) {
    console.error('onSceneReadyError', scene, message, exception)
  }

  function onSceneReadySetup(scene: BABYLON.Scene) {
    // console.log('onSceneReadySetup')
    BABYLON.SceneLoader.ShowLoadingScreen = false;
    const canvas = scene.getEngine().getRenderingCanvas()
    camera = new BABYLON.FreeCamera("FREE_CAMERA", new BABYLON.Vector3(1, 1, 1), scene)
    camera.attachControl(canvas)
    camera.angularSensibility = 5000;
    camera.fov = 1;

    makeCameraCollision(camera, scene);
    createCamSphere(camera, scene);
    setCameraGlobal(camera);
  }

  function Music(scene: Scene) {
    if (Engine.audioEngine) {
      Engine.audioEngine.useCustomUnlockedButton = true

    }
    music = new BABYLON.Sound("Music", "/sounds/ambient-sound.mp3", scene, () => {

    }, { loop: true, volume: 0.2, autoplay: false });

    if (!Boolean(musicPlaying)) {
      var observableMusic = scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
          case BABYLON.PointerEventTypes.POINTERDOWN:
            Engine.audioEngine.unlock()
            music.play()
            scene.onPointerObservable.remove(observableMusic)
            setCookie(null, 'musicPlaying', 'true', {
              maxAge: 30 * 24 * 60 * 60,
              path: '/',
            })
            break;

        }
      });
    }
  }




  function onSceneReadyImported(scene: BABYLON.Scene) {
    // // console.log('onSceneReadyImported')
    setSceneGlobal(scene);
    setSceneRef(scene);
    pointclickMoviment(scene, camera); // Point n click
    MakeRunBetter(scene); // Optimization
    MeshStart(scene); // Position to start camera 
    Music(scene); // Function to deal with music in scene


    /* Glow Highlight */
    let highlight = new BABYLON.HighlightLayer("highlight", scene, { mainTextureFixedSize: 384 })



    //#region REGISTER_BEFORE_RENDER
    scene.gravity = new BABYLON.Vector3(0, -0.1, 0)//gravity
    scene.fogMode = BABYLON.Scene.FOGMODE_NONE
    // Intersections
    if (screen.width < 640 || screen.height < 480) {
      // Mobile
      scene.activeCamera = camera;
      camSphere.parent = camera;
      BABYLON.SceneOptimizerOptions.HighDegradationAllowed()

    } else {
      scene.activeCamera = camera;
      camSphere.parent = camera;

      /*        scene.registerBeforeRender(function () {
               colision_initial = scene.getMeshByName("art_link_initial")
               colision_trigger_initial = scene.getMeshByName("col_trg_start");
               if(camSphere.intersectsMesh(colision_trigger_initial, true)){
                highlight.addMesh(colision_initial, BABYLON.Color3.FromHexString(HIGHLIGHT_COLOR))
                colision_initial.isPickable = true;
               }else{
                highlight.removeMesh(colision_initial)
                colision_initial.isPickable = false;
                
                
              }
          
                  colision_stand1 = scene.getMeshByName("col_trg_stand_1");
                  pdf_stand1 = scene.getMeshByName("art_pdf_1")
                  video_stand1 = scene.getMeshByName("art_video_1")
                  card_stand1 = scene.getMeshByName("art_card_1")
                  link_site_stand1 = scene.getMeshByName("art_link_1")
                  chat_stand1 = scene.getMeshByName("art_chat_1")
                  if(camSphere.intersectsMesh(colision_stand1, true)){
                    highlight.addMesh(chat_stand1, BABYLON.Color3.FromHexString(HIGHLIGHT_COLOR))
                    highlight.addMesh(link_site_stand1, BABYLON.Color3.FromHexString(HIGHLIGHT_COLOR))
                    highlight.addMesh(pdf_stand1, BABYLON.Color3.FromHexString(HIGHLIGHT_COLOR))
                    highlight.addMesh(video_stand1, BABYLON.Color3.FromHexString(HIGHLIGHT_COLOR))
                    highlight.addMesh(card_stand1, BABYLON.Color3.FromHexString(HIGHLIGHT_COLOR))
                    chat_stand1.isPickable = true;
                    link_site_stand1.isPickable = true;
                    pdf_stand1.isPickable = true;
                    video_stand1.isPickable = true;
                    card_stand1.isPickable = true;
                  }else{
                    highlight.removeMesh(chat_stand1)
                    highlight.removeMesh(link_site_stand1)
                    highlight.removeMesh(pdf_stand1)
                    highlight.removeMesh(video_stand1)
                    highlight.removeMesh(card_stand1)
                    chat_stand1.isPickable = false;
                    link_site_stand1.isPickable = false;
                    pdf_stand1.isPickable = false;
                    video_stand1.isPickable = false;
                    card_stand1.isPickable = false;
                    
                  }
      
                
      
                  var portal4 = scene.getMeshByName("obj_portal_4")
                  portal4.rotation.z += 0.015
      
                  var portal3 = scene.getMeshByName("obj_portal_3")
                  portal3.rotation.z += 0.015
      
                  var portal1 = scene.getMeshByName("obj_portal_1")
                  portal1.rotation.z += 0.015
      
                  for(var i = 1; i <= 9; i++){
                    var arrows = scene.getMeshByName("arw_"+i)
                    arrows.rotation.y += 0.020
                  }
                  
      
                  
                 
              
              // Make cubes moving
              for(var i = 43; i <= 45; i++){
                var cube_mesh45 = scene.getMeshByName("obj_smallcube_"+i)
               
                cube_mesh45
      
                if (cube_mesh45.position.z > 18)
                cube_mesh45.position.z -= 0.03;
                else if (cube_mesh45.position.z < 18 && cube_mesh45.position.x < -1)
                cube_mesh45.position.x += 0.03;
                else {
                  cube_mesh45.position.z = 50;
                  cube_mesh45.position.x = -9.48;}
              }
      
              // Make cube moving
              var full_cube_2 = scene.getMeshByName("obj_fullcube_an_2")
              if (full_cube_2.position.z > 18){
              full_cube_2.position.z -= 0.03;
              }else if (full_cube_2.position.z < 18 && full_cube_2.position.x < -1){
                full_cube_2.position.x += 0.03;
              }else {
                full_cube_2.position.z = 50;
                full_cube_2.position.x = -9.48;
              }
             
                let trg_loot_notebook = scene.getMeshByName("obj_loot")
                if(camSphere.intersectsMesh(trg_loot_notebook, true)){
                    trg_loot_notebook.isVisible = false;
                }
      
      
                video_auditorium = scene.getMeshByName("art_video_aud")
                colisao_auditorium = scene.getMeshByName("col_trg_auditorium")
                if(camSphere.intersectsMesh(colisao_auditorium, true)){
                  highlight.addMesh(video_auditorium, BABYLON.Color3.FromHexString(HIGHLIGHT_COLOR))
                  video_auditorium.isPickable = true;
                }else{
                  highlight.removeMesh(video_auditorium)
                  video_auditorium.isPickable = false;
                }
          
                
          
      
             }); */
    }
    //#endregion
  }


  return (
    <>
      {translatedWord.loading && (
        <>
          {loadingBabylonScene && (
            <GameLoading />
          )}
          <SidebarWithHeader >
            <SceneComponent
              antialias
              onSceneReady={onSceneReady}
              onRender={null} // Will run on every frame render.  Useful for animation such as rotating the object along the y-axis, etc.
              id={BABYLON_ID_NAME}
            />
          </SidebarWithHeader>
        </>
      )}

    </>
  )
}