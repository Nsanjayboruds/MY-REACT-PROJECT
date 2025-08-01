export default function Key({ position }) {
  return (
    <mesh position={position}>
      <torusGeometry args={[0.2, 0.05, 16, 100]} />
      <meshStandardMaterial color="gold" />
    </mesh>
  )
}
