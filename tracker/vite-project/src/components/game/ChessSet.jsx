import { useGLTF } from '@react-three/drei'

export default function ChessSet(props) {
  const { scene } = useGLTF('/models/Chess Set.glb')
  return <primitive object={scene} {...props} />
}
