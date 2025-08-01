import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Room from './components/game/Room'
import Door from './components/game/Door'
import Key from './components/game/Key'
import Puzzle from './components/game/puzzle'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[5, 10, 5]} intensity={1.5} />
      <Environment preset="warehouse" />
      <Room />
      <Door position={[0, 0, -4.5]} />
      <Key position={[2, 0.5, 1]} />
      <Puzzle position={[-3, 1, 2]} />
      <OrbitControls />
    </Canvas>
  )
}
