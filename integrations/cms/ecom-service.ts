import { useCart } from "./cms-ecom/cart/useCartStore";

/**
     * Buy now - skips the cart and goes directly to checkout.
     * Creates a checkout with the specified items and redirects to payment.
     * NOTE: Always show a loading state - this redirects and takes time!
     *
     * @param items - Array of items with collectionId, itemId, and optional quantity
     */
export async function buyNow(
  items: Array<{ collectionId: string; itemId: string; quantity?: number }>
): Promise<void> {
  if (items.length === 0) {
    throw new Error("At least one item is required for checkout");
  }

  // Placeholder: in local mode we just add items to cart and "pretend" to checkout.
  const { actions } = useCart();
  for (const item of items) {
    actions.addToCart({
      collectionId: item.collectionId,
      itemId: item.itemId,
      quantity: item.quantity ?? 1,
    });
  }
  await actions.checkout();
}

/**
 * Hook providing eCommerce API for catalog collections.
 * NOTE: Cart operations (addToCart, checkout) require the CurrentCart provider
 * which comes from @wix/ecom/providers and is set up in the app's router configuration.
 * If not available, use the standalone buyNow() function instead.
 */
export function useEcomService() {
  const { actions, itemCount } = useCart();

  /**
   * Add items to the cart
   * @param items - Array of items with collectionId, itemId, and optional quantity
   */
  const addToCart = async (
    items: Array<{ collectionId: string; itemId: string; quantity?: number }>
  ): Promise<void> => {
    for (const item of items) {
      actions.addToCart({
        collectionId: item.collectionId,
        itemId: item.itemId,
        quantity: item.quantity ?? 1,
      });
    }
  };

  /**
   * Proceed to checkout with current cart items.
   * NOTE: This redirects to the checkout page - always show a loading state!
   */
  const checkout = async (): Promise<void> => {
    await actions.checkout();
  };

  return {
    /** Whether cart operations are available */
    isCartAvailable: true,
    addToCart,
    checkout,
    itemCount,
  };
}
