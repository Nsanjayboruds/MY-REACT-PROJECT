import { useState, useEffect } from 'react'
import { Html } from '@react-three/drei'
import useGameStore from '../../stores/gameStore'

export default function Menu() {
  const { isPaused, togglePause, resetGame } = useGameStore()
  const [activeTab, setActiveTab] = useState('main')
  const [volume, setVolume] = useState(80)

  if (!isPaused) return null

  return (
    <Html center>
      <div style={{
        position: 'absolute',
        width: '400px',
        background: 'rgba(0,0,0,0.8)',
        border: '2px solid #444',
        borderRadius: '8px',
        padding: '24px',
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ marginTop: 0, textAlign: 'center' }}>ESCAPE ROOM</h1>
        
        <div style={{
          display: 'flex',
          marginBottom: '16px',
          borderBottom: '1px solid #444'
        }}>
          <button 
            onClick={() => setActiveTab('main')}
            style={{
              padding: '8px 16px',
              background: activeTab === 'main' ? '#333' : 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Main
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '8px 16px',
              background: activeTab === 'settings' ? '#333' : 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Settings
          </button>
        </div>

        {activeTab === 'main' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={togglePause}
              style={{
                padding: '12px',
                background: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Resume Game
            </button>
            <button
              onClick={resetGame}
              style={{
                padding: '12px',
                background: '#442222',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Restart Game
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>
                Volume: {volume}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" checked />
                Fullscreen Mode
              </label>
            </div>
          </div>
        )}

        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px' }}>
          Press ESC to {isPaused ? 'resume' : 'pause'}
        </div>
      </div>
    </Html>
  )
}