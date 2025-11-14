import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] // each item: { name, image, description, cost, quantity }
  },
  reducers: {
    // Add a plant to cart if it does not exist yet. If it exists, increase its quantity.
    addItem: (state, action) => {
      const incoming = action.payload
      const existing = state.items.find(item => item.name === incoming.name)

      if (existing) {
        existing.quantity = (existing.quantity || 1) + (incoming.quantity || 1)
      } else {
        state.items.push({
          ...incoming,
          quantity: incoming.quantity ? incoming.quantity : 1
        })
      }
    },

    // Remove a plant by name
    removeItem: (state, action) => {
      const nameToRemove = action.payload
      state.items = state.items.filter(item => item.name !== nameToRemove)
    },

    // Update quantity of a specific plant by name
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload
      const target = state.items.find(item => item.name === name)
      if (target) {
        // If quantity drops below 1, remove the item
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name)
        } else {
          target.quantity = quantity
        }
      }
    },

    // Optional: clear the entire cart
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
