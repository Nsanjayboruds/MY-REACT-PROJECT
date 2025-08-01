import { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'
import useGameStore from '../../stores/gameStore'

const MOVEMENT_SPEED = 5
const JUMP_FORCE = 4
const GRAVITY = 9.8

export default function Player({ position = [0, 1, 0] }) {
  const { camera, scene } = useThree()
  const controlsRef = useRef()
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const raycaster = useRef(new THREE.Raycaster())
  const [canJump, setCanJump] = useState(false)
  const { toggleInventory, isPaused } = useGameStore()

  // Set initial camera position
  useEffect(() => {
    camera.position.set(...position)
  }, [camera, position])

  useFrame((state, delta) => {
    if (!controlsRef.current || isPaused) return
    const controls = controlsRef.current
    const moveSpeed = delta * MOVEMENT_SPEED

    // Reset velocity XZ for new frame
    velocity.current.x = 0
    velocity.current.z = 0

    // Movement
    if (controls.isLocked) {
      if (controls.moveForward) velocity.current.z -= moveSpeed
      if (controls.moveBackward) velocity.current.z += moveSpeed
      if (controls.moveLeft) velocity.current.x -= moveSpeed
      if (controls.moveRight) velocity.current.x += moveSpeed
      if (controls.jump && canJump) {
        velocity.current.y = JUMP_FORCE
        setCanJump(false)
      }
    }

    // Gravity
    velocity.current.y -= GRAVITY * delta

    // Apply movement to camera
    camera.position.addScaledVector(velocity.current, delta)

    // Simple floor collision
    if (camera.position.y < 1) {
      camera.position.y = 1
      velocity.current.y = 0
      setCanJump(true)
    }

    // Raycast for interactions (forward from camera)
    raycaster.current.setFromCamera(new THREE.Vector2(0, 0), camera)
    const intersects = raycaster.current.intersectObjects(scene.children, true)

    // You can add hover highlight here if desired:
    if (intersects.length > 0) {
      const interactable = intersects[0].object.userData.interactable
      // Example: Change color or cursor
    }
  })

  // Lock pointer click
  const handleClick = () => {
    if (!isPaused) {
      controlsRef.current.lock()
    }
  }

  // Interaction handler (key / door / puzzle)
  const handleInteraction = () => {
    if (!controlsRef.current?.isLocked) return

    raycaster.current.setFromCamera(new THREE.Vector2(0, 0), camera)
    const intersects = raycaster.current.intersectObjects(scene.children, true)

    if (intersects.length > 0) {
      const object = intersects[0].object
      const data = object.userData

      if (data.interactable) {
        if (data.type === 'door') {
          console.log('Attempting to open door')
          // Trigger door open logic here
        } else if (data.type === 'item') {
          console.log('Picking up item')
          // Trigger item pickup logic here
        }
      }
    }
  }

  return (
    <>
      <PointerLockControls
        ref={controlsRef}
        makeDefault
        onClick={handleClick}
        onLock={() => console.log('Pointer Locked')}
        onUnlock={() => console.log('Pointer Unlocked')}
      />
      <group
        onPointerDown={(e) => {
          if (e.button === 0) handleInteraction()
          if (e.button === 2) toggleInventory()
        }}
      >
        <mesh position={[0, 0, -2]}>
          <ringGeometry args={[0.02, 0.04, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>
    </>
  )
}
