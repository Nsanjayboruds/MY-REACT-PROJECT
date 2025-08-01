import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import Player from '../components/game/Player'
import Room from '../components/game/Room'
import Door from '../components/game/Door'
import Puzzle from '../components/game/Puzzle'
import Lights from '../components/three/Lights'
import Controls from '../components/three/Controls'
import Inventory from '../components/ui/Inventory'
import HUD from '../components/ui/HUD'
import useInventory from '../stores/inventoryStore'

export default function MainScene() {
  const addKey = useInventory((state) => state.addKey)

  const handlePuzzleSolved = () => {
    console.log('Puzzle solved! Key added to inventory.')
    addKey('golden-key')
  }

  return (
    <>
      <Lights />
      <Controls />
      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        <Room />
        <Door position={[0, 0, -5]} />
        <Puzzle position={[2, 0, -3]} onSolved={handlePuzzleSolved} />
      </Suspense>
      <Player />
      <Inventory />
      <HUD />
    </>
  )
}
