import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'
import { calculateTotals } from '@/lib/utils'
import toast from 'react-hot-toast'

interface CartState {
  items: CartItem[]
  totals: {
    subtotal: number
    shipping: number
    discount: number
    grandTotal: number
  }
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string, selectedOptions?: Record<string, string>) => void
  updateQuantity: (productId: string, quantity: number, selectedOptions?: Record<string, string>) => void
  clearCart: () => void
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totals: {
        subtotal: 0,
        shipping: 0,
        discount: 0,
        grandTotal: 0,
      },

      addItem: (item) => {
        const { items } = get()
        const { quantity = 1, ...itemData } = item
        
        // Check if item with same product and options already exists
        const existingItemIndex = items.findIndex(
          (cartItem) =>
            cartItem.productId === item.productId &&
            JSON.stringify(cartItem.selectedOptions || {}) === JSON.stringify(item.selectedOptions || {})
        )

        let newItems: CartItem[]
        
        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          newItems = items.map((cartItem, index) =>
            index === existingItemIndex
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          )
        } else {
          // Add new item
          newItems = [...items, { ...itemData, quantity }]
        }

        const newTotals = calculateTotals(newItems)
        
        set({
          items: newItems,
          totals: newTotals,
        })

        toast.success('Added to cart')
      },

      removeItem: (productId, selectedOptions) => {
        const { items } = get()
        const newItems = items.filter(
          (item) =>
            !(item.productId === productId &&
              JSON.stringify(item.selectedOptions || {}) === JSON.stringify(selectedOptions || {}))
        )

        const newTotals = calculateTotals(newItems)
        
        set({
          items: newItems,
          totals: newTotals,
        })

        toast.success('Removed from cart')
      },

      updateQuantity: (productId, quantity, selectedOptions) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedOptions)
          return
        }

        const { items } = get()
        const newItems = items.map((item) =>
          item.productId === productId &&
          JSON.stringify(item.selectedOptions || {}) === JSON.stringify(selectedOptions || {})
            ? { ...item, quantity }
            : item
        )

        const newTotals = calculateTotals(newItems)
        
        set({
          items: newItems,
          totals: newTotals,
        })
      },

      clearCart: () => {
        set({
          items: [],
          totals: {
            subtotal: 0,
            shipping: 0,
            discount: 0,
            grandTotal: 0,
          },
        })
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
