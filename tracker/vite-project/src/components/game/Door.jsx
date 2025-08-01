export default function Door({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 2, 0.2]} />
      <meshStandardMaterial color="brown" />
    </mesh>
  )
}
