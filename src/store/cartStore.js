import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      giftMessage: '',
      
      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const id = `${product.id}-${variant.size}`
          const existingItem = state.items.find(item => item.id === id)
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + quantity } : item
              )
            }
          }
          
          return {
            items: [...state.items, {
              id,
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: variant.price,
              size: variant.size,
              image: product.images[0],
              quantity
            }]
          }
        })
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity < 1) return
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },
      
      clearCart: () => set({ items: [], giftMessage: '' }),
      
      setGiftMessage: (message) => set({ giftMessage: message }),
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'bite-bills-cart'
    }
  )
)