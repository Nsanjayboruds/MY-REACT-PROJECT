import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { SpotLight, useDepthBuffer } from '@react-three/drei'
import * as THREE from 'three'

export default function Lights() {
  const depthBuffer = useDepthBuffer({ size: 256 })
  const flickerRef = useRef()
  const ambientRef = useRef()
  const { scene } = useThree()

  // Initialize lights
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0x111122, 0.02)
    return () => (scene.fog = null)
  }, [])

  // Flickering light effect
  useFrame(({ clock }) => {
    if (flickerRef.current) {
      const flicker = Math.sin(clock.getElapsedTime() * 3) * 0.1 + 0.9
      flickerRef.current.intensity = flicker * 2
    }
  })

  return (
    <>
      {/* Main directional light (sun/moon) */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Dynamic flickering light (e.g., candle) */}
      <SpotLight
        ref={flickerRef}
        penumbra={0.5}
        depthBuffer={depthBuffer}
        position={[2, 2, 0]}
        angle={0.3}
        intensity={2}
        color="#ffaa66"
        castShadow
      />

      {/* Ambient fill light */}
      <ambientLight 
        ref={ambientRef} 
        intensity={0.3} 
        color="#445588" 
      />

      {/* Emergency light (red glow) */}
      <rectAreaLight
        width={10}
        height={10}
        intensity={1}
        color="#ff0000"
        position={[0, 5, -5]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </>
  )
}