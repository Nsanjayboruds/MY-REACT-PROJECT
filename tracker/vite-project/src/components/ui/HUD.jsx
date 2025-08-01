import { Html } from '@react-three/drei'
import useInventoryStore from '../../stores/inventoryStore'
import useGameStore from '../../stores/gameStore'

export default function HUD() {
  const { currentObjective } = useGameStore()
  const { items } = useInventoryStore()

  return (
    <Html>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        pointerEvents: 'none'
      }}>
        <div style={{
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 16px',
          borderRadius: '4px',
          marginBottom: '8px'
        }}>
          <strong>Objective:</strong> {currentObjective}
        </div>
        
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(0,0,0,0.5)',
          padding: '8px',
          borderRadius: '4px'
        }}>
          {items.slice(0, 3).map((item, index) => (
            <img 
              key={index}
              src={`/assets/icons/${item}.png`}
              alt={item}
              style={{ width: '24px', height: '24px' }}
            />
          ))}
          {items.length > 3 && (
            <div style={{
              width: '24px',
              height: '24px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}>
              +{items.length - 3}
            </div>
          )}
        </div>
      </div>
      
      {/* Crosshair */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '20px',
        height: '20px',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '4px',
          background: 'white',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '16px',
          height: '16px',
          border: '1px solid rgba(255,255,255,0.5)',
          borderRadius: '50%'
        }} />
      </div>
    </Html>
  )
}