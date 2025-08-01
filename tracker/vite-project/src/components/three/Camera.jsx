import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import useGameStore from '../../stores/gameStore'
import * as THREE from 'three'

export default function Camera({ fov = 75 }) {
  const cameraRef = useRef()
  const { setDefaultCamera } = useThree()
  const { isPaused } = useGameStore()

  // Register camera
  useEffect(() => {
    if (cameraRef.current) {
      setDefaultCamera(cameraRef.current)
      cameraRef.current.lookAt(0, 1, 0)
    }
  }, [])

  // Breathing effect when idle
  useFrame(({ clock }) => {
    if (cameraRef.current && !isPaused) {
      const breath = Math.sin(clock.getElapsedTime() * 0.5) * 0.01
      cameraRef.current.position.y += breath
    }
  })

  return (
    <perspectiveCamera
      ref={cameraRef}
      fov={fov}
      near={0.1}
      far={100}
      position={[0, 1.6, 5]}
      rotation={[0, Math.PI, 0]}
    />
  )
}