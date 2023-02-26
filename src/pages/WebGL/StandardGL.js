import { useContext, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Stage, Environment, useCursor, Html, BBAnchor, Box, useTexture } from '@react-three/drei'
import { Select, Outline, EffectComposer } from '@react-three/postprocessing'
import { ConfigContext } from '../../contexts/ConfigContext'
import { RoomContext } from '../../contexts/RoomContext'
import { OrbitControls } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import create from 'zustand'
import { DirectionalLight, MeshStandardMaterial, RepeatWrapping, Vector3 } from 'three'
import * as THREE from 'three'

const useStore = create((set) => ({ target: null, setTarget: (target) => set({ target }) }))

const MainCamera = ({ position, lookAt }) => {
  const { camera } = useThree()
  const vec = new Vector3()

  useFrame(() => {
    camera.position.lerp(vec.set(position.x, position.y, position.z), 0.05)
    camera.lookAt(vec.set(lookAt.x, lookAt.y, lookAt.z))
  })
}

export default function StandardGL({ cameraPosIndex, floorColourIndex, wallPaintIndex }) {
  const { config, data } = useContext(ConfigContext)
  const { envIndex } = useContext(RoomContext)

  const cameraData = data.environments?.at(envIndex)?.camera || {}
  const { setTarget } = useStore()

  return (
    <Canvas
      gl={{ logarithmicDepthBuffer: true }}
      shadows={true}
      camera={{
        position: [2, 2, 2],
        fov: cameraData.positions?.fov || 50,
        type: "PerspectiveCamera",
        zoom: 1,
        near: .1,
        far: 500,
      }} dpr={[1, 2]} onPointerMissed={() => setTarget(null)}>
      <Scene rotation={[0, 0, 0]}
        path={`${config.PATH_WEBGL_ASSET}/00-Levels/${data.environments?.at(envIndex)?.path}/model.gltf`}
        cameraPosIndex={cameraPosIndex}
        floorColourIndex={floorColourIndex} />
      {/* {target && <TransformControls object={target} mode={'translate'} />} */}
      {/* <Stage intensity={0} environment="sunset" adjustCamera={false}>
      </Stage> */}
      {/* <Box position={[0, 0, 0]} scale={0.3}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </Box> */}
      {/* <OrbitControls enableZoom={true} makeDefault minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}
      {/* <fog attach="fog" args={['black', 15, 21.5]} /> */}
      {/* <color attach="background" args={['skyblue']}></color> */}
      <directionalLight color="white" position={[0, 0, -1]} intensity={0.5} />
      <ambientLight intensity={0.5} />
      <Environment background preset="sunset" blur={0.1} />
    </Canvas>
  )
}

function Scene({ path, floorColourIndex, lookAt, cameraPosIndex, ...props }) {
  const { config, data } = useContext(ConfigContext)
  const { envIndex, furnitures } = useContext(RoomContext)

  const gltf = useGLTF(path)
  const { nodes: roomNodes } = gltf
  const floorNames = ["modern", "scandinavian", "industrial"]
  // const floorTextureUri = `${config.PATH_WEBGL_ASSET}/00-Levels/Materials/${floorNames[floorColourIndex]}/diffuse.jpg`

  // const [floorColorMap, floorNormalMap, floorRoughMap] = useLoader(TextureLoader, [
  //   `/texture/floor/${floorNames[floorColourIndex]}/diffuse.jpg`,
  //   `/texture/floor/${floorNames[floorColourIndex]}/normal.png`,
  //   `/texture/floor/${floorNames[floorColourIndex]}/roughness.jpg`
  // ])
  const [floorColorMap, floorNormalMap, floorRoughMap] = useTexture([
    `/texture/floor/${floorNames[floorColourIndex]}/diffuse.jpg`,
    `/texture/floor/${floorNames[floorColourIndex]}/normal.png`,
    `/texture/floor/${floorNames[floorColourIndex]}/roughness.jpg`
  ])

  floorColorMap.wrapS = RepeatWrapping
  floorColorMap.wrapT = RepeatWrapping
  floorColorMap.repeat.set(1, 1)
  floorColorMap.offset.set(0, 0)
  const floorMap = new THREE.MeshPhongMaterial({ map: floorColorMap })

  const cameraData = data.environments?.at(envIndex)?.camera || {}
  cameraPosIndex = (cameraPosIndex + cameraData.positions?.corners.length * 100) % cameraData.positions?.corners.length
  const [camPos, setCamPos] = useState({ x: 0, y: 0, z: 0 })
  const [camLookat, setCamLookat] = useState({ x: 0, y: 0, z: 0 })
  const camObj = useRef()
  const lookatObj = useRef()

  useFrame(() => {
    var tarCamPos = new THREE.Vector3()
    var tarCamLookat = new THREE.Vector3()
    camObj?.current.getWorldPosition(tarCamPos)
    lookatObj?.current.getWorldPosition(tarCamLookat)

    if (JSON.stringify(tarCamPos) !== JSON.stringify(camPos))
      setCamPos(tarCamPos)
    if (JSON.stringify(tarCamLookat) !== JSON.stringify(camLookat))
      setCamLookat(tarCamLookat)
  })

  return (
    <group {...props}>
      {/* Furnitures */}
      {
        furnitures.map((furniture, index) => {
          const uri = `${config.PATH_WEBGL_ASSET}/01-Models/${furniture.colour?.path}/model.glb`
          return furniture.colour?.path && <Furniture key={index} path={uri} transform={{ position: furniture.position, rotation: furniture.rotation }} name={furniture.name} />
        })
      }
      {/* Camera */}
      <mesh ref={camObj} position={[cameraData.positions?.corners[cameraPosIndex].x, cameraData.positions?.corners[cameraPosIndex].y, cameraData.positions?.corners[cameraPosIndex].z]}></mesh>
      <mesh ref={lookatObj} position={[cameraData.positions?.lookat?.x, cameraData.positions?.lookat?.y, cameraData.positions?.lookat?.z]}></mesh>
      <MainCamera position={camPos} lookAt={camLookat}></MainCamera>
      {/* Room */}
      {/* <primitive object={scene} /> */}
      {
        Object.keys(roomNodes).map((key, index) => {
          const node = roomNodes[key]
          return node.type === "Mesh" &&
            <mesh geometry={node.geometry} material={node.name?.endsWith("_Floor") ? floorMap : node.material} key={index}>
              {
                // node.name?.endsWith("_Floor") && <meshPhongMaterial map={floorColorMap} />
              }
            </mesh>
        })
      }
    </group >
  )
}

function Furniture({ path, name, transform }) {
  const { scene, nodes } = useGLTF(path)
  const { position, rotation } = transform
  const [active, setActive] = useState(false);

  const setTarget = useStore((state) => state.setTarget)
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const onClickHandler = (act) => {
    setActive(act);
  }

  return (
    <Select enabled={active}>
      <group>
        <mesh onClick={e => {
          setTarget(e.object)
        }} onPointerMissed={() => onClickHandler(false)} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} position={[position.x, active ? position.y + 0.3 : position.y, position.z]} rotation={[rotation.x * Math.PI, rotation.y * Math.PI, rotation.z * Math.PI]} >
          {/* <meshStandardMaterial emissive="#404057" color={active ? 'hotpink' : 'orange'} transparent /> */}
          {
            Object.keys(nodes).map((key, index) => {
              const node = nodes[key]
              return node.type === "Mesh" &&
                <mesh geometry={node.geometry} material={node.material} key={index}></mesh>
            })
          }
          {/* <BBAnchor anchor={[0, 0.5, 0]}>
            <Html distanceFactor={5} center sprite>
              <div className='content'>{name}</div>
            </Html>
          </BBAnchor> */}
        </mesh>
      </group>
    </Select>
  )
}