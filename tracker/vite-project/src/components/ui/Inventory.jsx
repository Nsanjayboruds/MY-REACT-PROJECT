import { useRef, useEffect } from 'react'
import { Html } from '@react-three/drei'
import useInventoryStore from '../../stores/inventoryStore'
import useGameStore from '../../stores/gameStore'

export default function Inventory() {
  const { items } = useInventoryStore()
  const { isInventoryOpen, toggleInventory } = useGameStore()
  const inventoryRef = useRef()

  // Close inventory on ESC press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') toggleInventory()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isInventoryOpen) return null

  return (
    <Html center>
      <div 
        ref={inventoryRef}
        className="inventory-container"
        style={{
          position: 'absolute',
          width: '300px',
          background: 'rgba(0,0,0,0.7)',
          border: '2px solid #444',
          borderRadius: '8px',
          padding: '16px',
          color: 'white'
        }}
      >
        <h2 style={{ marginTop: 0 }}>Inventory</h2>
        <div className="items-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px'
        }}>
          {items.map((item, index) => (
            <div 
              key={index}
              className="inventory-item"
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '8px',
                borderRadius: '4px',
                textAlign: 'center'
              }}
            >
              <img 
                src={`/assets/icons/${item}.png`} 
                alt={item}
                style={{ width: '32px', height: '32px' }}
              />
              <div style={{ fontSize: '12px' }}>{item.replace('_', ' ')}</div>
            </div>
          ))}
        </div>
        <button 
          onClick={toggleInventory}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            background: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Close (ESC)
        </button>
      </div>
    </Html>
  )
}