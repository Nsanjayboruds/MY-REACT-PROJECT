import { create } from 'zustand'

import { persist } from 'zustand/middleware'

const useInventoryStore = create(
  persist(
    (set, get) => ({
      items: [],
      maxSlots: 12,
      
      // Add item if there's space
      addItem: (item) => {
        if (get().items.length < get().maxSlots) {
          set((state) => ({ items: [...state.items, item] }))
          return true
        }
        return false
      },
      
      // Remove item by name or index
      removeItem: (identifier) => {
        set((state) => ({
          items: typeof identifier === 'number' 
            ? state.items.filter((_, i) => i !== identifier)
            : state.items.filter(i => i !== identifier)
        }))
      },
      
      // Check if item exists
      hasItem: (itemName) => {
        return get().items.includes(itemName)
      },
      
      // Combine items (e.g., key + lock)
      combineItems: (item1, item2) => {
        const combinations = {
          'rusty_key+old_lock': 'unlocked_door',
          'note+codebook': 'decrypted_message'
        }
        const comboKey = `${item1}+${item2}`
        
        if (combinations[comboKey]) {
          set(state => ({
            items: [
              ...state.items.filter(i => i !== item1 && i !== item2),
              combinations[comboKey]
            ]
          }))
          return true
        }
        return false
      },
      
      // Clear inventory
      reset: () => set({ items: [] })
    }),
    {
      name: 'escape-room-inventory',
      getStorage: () => localStorage,
    }
  )
)

export default useInventoryStore