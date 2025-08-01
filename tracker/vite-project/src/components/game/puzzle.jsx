export default function Puzzle({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  )
}
