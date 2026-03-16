import { create } from "zustand";

/** Cart item representing a product in the cart */
export interface CartItem {
  /** Server-generated line item ID */
  id: string;
  /** CMS collection ID */
  collectionId: string;
  /** CMS item ID (product ID) */
  itemId: string;
  /** Product name for display */
  name: string;
  /** Item price */
  price: number;
  /** Quantity in cart */
  quantity: number;
  /** Product image URL */
  image?: string;
}

/** Input for adding items to cart */
export interface AddToCartInput {
  collectionId: string;
  itemId: string;
  quantity?: number;
}

interface CartState {
  // State
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  addingItemId: string | null;
  isCheckingOut: boolean;
  error: string | null;
}

interface CartActions {
  addToCart: (input: AddToCartInput) => void;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

type CartStore = CartState & { actions: CartActions };

/**
 * Zustand store for a purely local cart (no backend).
 */
export const useCartStore = create<CartStore>((set, get) => ({
  // Initial state
  items: [],
  isOpen: false,
  isLoading: false,
  addingItemId: null,
  isCheckingOut: false,
  error: null,

  actions: {
    /** Add item to cart (local only) */
    addToCart: (input: AddToCartInput) => {
      const { items } = get();
      const existing = items.find(
        (i) => i.itemId === input.itemId && i.collectionId === input.collectionId
      );

      if (existing) {
        const quantity = (input.quantity ?? 1) + existing.quantity;
        set({
          items: items.map((i) =>
            i.id === existing.id ? { ...i, quantity } : i
          ),
        });
      } else {
        const newItem: CartItem = {
          id: `${input.collectionId}-${input.itemId}`,
          collectionId: input.collectionId,
          itemId: input.itemId,
          name: "Item",
          price: 0,
          quantity: input.quantity ?? 1,
        };
        set({ items: [...items, newItem] });
      }
    },

    /** Remove item from cart */
    removeFromCart: (item: CartItem) => {
      const { items } = get();
      set({ items: items.filter((i) => i.id !== item.id) });
    },

    /** Update quantity (local only) */
    updateQuantity: (item: CartItem, quantity: number) => {
      const { items } = get();
      if (quantity <= 0) {
        set({ items: items.filter((i) => i.id !== item.id) });
      } else {
        set({
          items: items.map((i) =>
            i.id === item.id ? { ...i, quantity } : i
          ),
        });
      }
    },

    /** Clear all items from cart */
    clearCart: () => {
      set({ items: [] });
    },

    /** Checkout - placeholder (no real payment yet) */
    checkout: async () => {
      set({ isCheckingOut: true, error: null });
      // Here you can integrate Stripe/Razorpay later.
      // For now just simulate a successful checkout.
      setTimeout(() => {
        set({ items: [], isCheckingOut: false });
        if (typeof window !== "undefined") {
          alert("Checkout not connected yet. Order simulated locally.");
        }
      }, 500);
    },

    /** Toggle cart drawer */
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

    /** Open cart drawer */
    openCart: () => set({ isOpen: true }),

    /** Close cart drawer */
    closeCart: () => set({ isOpen: false }),
  },
}));

/**
 * Hook to access cart state and actions.
 * No provider needed - works anywhere in the app.
 *
 * For currency formatting, use the separate `useCurrency()` hook.
 *
 * @example
 * ```tsx
 * import { useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
 *
 * const { items, addingItemId, actions } = useCart();
 * const { currency } = useCurrency();
 *
 * // Format price with site currency
 * <span>{formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}</span>
 *
 * // Add item (shows loading only on this button)
 * <Button
 *   disabled={addingItemId === item._id}
 *   onClick={() => actions.addToCart({ collectionId: 'x', itemId: item._id })}
 * >
 *   {addingItemId === item._id ? 'Adding...' : 'Add to Cart'}
 * </Button>
 * ```
 */
export const useCart = () => {
  const store = useCartStore();

  // Computed values
  const itemCount = store.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = store.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    // State
    items: store.items,
    itemCount,
    totalPrice,
    isOpen: store.isOpen,
    isLoading: store.isLoading,
    addingItemId: store.addingItemId,
    isCheckingOut: store.isCheckingOut,
    error: store.error,
    // Actions
    actions: store.actions,
  };
};
