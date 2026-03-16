import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  bakery_name: string;
}

interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discount: number;
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyCoupon: (code: string) => boolean;
  clearCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
}

const COUPONS = {
  'BITE10': 0.1,
  'SWEET15': 0.15,
  'COOKIE20': 0.2,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0,
      isOpen: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      applyCoupon: (code) => {
        const discount = COUPONS[code.toUpperCase() as keyof typeof COUPONS];
        if (discount) {
          set({ couponCode: code.toUpperCase(), discount });
          return true;
        }
        return false;
      },

      clearCart: () => {
        set({ items: [], couponCode: null, discount: 0 });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 500 ? 0 : 50; // Free delivery above ₹500
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const deliveryFee = get().getDeliveryFee();
        const discount = get().discount;
        return subtotal + deliveryFee - (subtotal * discount);
      },
    }),
    {
      name: 'bite-bills-cart',
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        discount: state.discount,
      }),
    }
  )
);