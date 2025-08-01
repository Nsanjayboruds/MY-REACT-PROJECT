import { create } from 'zustand'

import { devtools } from 'zustand/middleware'

const useGameStore = create(
  devtools(
    (set, get) => ({
      // Game status
      isPaused: false,
      isInventoryOpen: false,
      isGameOver: false,
      currentScene: 'main_room',
      
      // Player state
      playerHealth: 100,
      playerStamina: 100,
      discoveredClues: 0,
      
      // Game progress
      currentObjective: 'Find a way out of the room',
      completedObjectives: [],
      unlockedDoors: [],
      
      // Time tracking
      startTime: Date.now(),
      playTime: 0,
      
      // Actions
      togglePause: () => {
        const { isPaused } = get()
        set({ isPaused: !isPaused })
        document.exitPointerLock()
      },
      
      toggleInventory: () => {
        const { isInventoryOpen } = get()
        set({ 
          isInventoryOpen: !isInventoryOpen,
          isPaused: !isInventoryOpen
        })
      },
      
      addObjective: (objective) => {
        set(state => ({
          currentObjective: objective,
          completedObjectives: [...state.completedObjectives, state.currentObjective]
        }))
      },
      
      unlockDoor: (doorId) => {
        set(state => ({
          unlockedDoors: [...state.unlockedDoors, doorId]
        }))
      },
      
      updatePlayerStats: (stats) => {
        set(state => ({
          playerHealth: Math.max(0, Math.min(100, state.playerHealth + (stats.health || 0))),
          playerStamina: Math.max(0, Math.min(100, state.playerStamina + (stats.stamina || 0)))
        }))
      },
      
      // Timer system
      updatePlayTime: () => {
        set({ playTime: Math.floor((Date.now() - get().startTime) / 1000) })
      },
      
      // Reset game
      resetGame: () => {
        set({
          isPaused: false,
          isInventoryOpen: false,
          isGameOver: false,
          playerHealth: 100,
          playerStamina: 100,
          discoveredClues: 0,
          currentObjective: 'Find a way out of the room',
          completedObjectives: [],
          unlockedDoors: [],
          startTime: Date.now(),
          playTime: 0
        })
      },
      
      // Game over states
      gameOver: (win = false) => {
        set({
          isGameOver: true,
          isPaused: true,
          currentObjective: win ? 'You escaped!' : 'Game Over'
        })
      }
    }),
    {
      name: 'escape-room-state',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
)

export default useGameStore