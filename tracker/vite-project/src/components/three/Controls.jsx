import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import useGameStore from '../../stores/gameStore'
import * as THREE from 'three'

const MOVEMENT_SPEED = 5
const JUMP_FORCE = 4

export default function Controls() {
  const controlsRef = useRef()
  const velocity = useRef(new THREE.Vector3())
  const { camera } = useThree()
  const { isPaused, togglePause } = useGameStore()

  // Event handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') togglePause()
      if (e.key === 'e') console.log('Interact') // Example interaction
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Movement logic
  useFrame((state, delta) => {
    if (!controlsRef.current || isPaused) return

    const moveSpeed = delta * MOVEMENT_SPEED
    const { moveForward, moveBackward, moveLeft, moveRight } = controlsRef.current

    // Reset velocity
    velocity.current.x = 0
    velocity.current.z = 0

    // Movement inputs
    if (moveForward) velocity.current.z -= moveSpeed
    if (moveBackward) velocity.current.z += moveSpeed
    if (moveLeft) velocity.current.x -= moveSpeed
    if (moveRight) velocity.current.x += moveSpeed

    // Apply movement
    camera.translateX(velocity.current.x)
    camera.translateZ(velocity.current.z)

    // Simple collision detection
    const cameraWorldPos = camera.position.clone()
    if (cameraWorldPos.y < 1) {
      camera.position.y = 1
    }
  })

  return (
    <PointerLockControls
      ref={controlsRef}
      makeDefault
      onLock={() => console.log('Controls active')}
      onUnlock={() => console.log('Controls inactive')}
      maxPolarAngle={Math.PI * 0.9} // Prevent looking straight up/down
      minPolarAngle={Math.PI * 0.1}
    />
  )
}