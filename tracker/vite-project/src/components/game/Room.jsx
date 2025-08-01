import { useGLTF } from '@react-three/drei'
import Door from './Door'
import Key from './Key'
import Puzzle from './Puzzle'

export default function Room() {
  const { scene } = useGLTF('/models/House interior.glb')

  return (
    <group dispose={null}>
      <primitive object={scene} />
      <Door position={[0, 0, -4.5]} />
      <Key position={[2, 0.5, 1]} />
      <Puzzle position={[-3, 1, 2]} />
    </group>
  )
}
