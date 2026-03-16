import { useCartStore } from '../store/cartStore';

export const useCart = () => {
  const {
    items,
    couponCode,
    discount,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    clearCart,
    toggleCart,
    getTotal,
    getSubtotal,
    getDeliveryFee,
  } = useCartStore();

  return {
    items,
    couponCode,
    discount,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    clearCart,
    toggleCart,
    getTotal,
    getSubtotal,
    getDeliveryFee,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
  };
};