import { Html, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import MainScene from './MainScene'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ color: 'white', fontSize: '2rem' }}>
        Loading... {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

export default function LoadingScene() {
  return (
    <Canvas>
      <ambientLight />
      <Loader />
      <MainScene />
    </Canvas>
  )
}
