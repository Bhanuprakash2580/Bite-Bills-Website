import { useCart } from "./cart/useCartStore";

/**
 * Buy now - skips the cart and goes directly to checkout.
 * Creates a checkout with the specified items and redirects to payment.
 *
 * NOTE: Always show a loading state - this redirects and takes time!
 *
 * @param items - Array of items with collectionId, itemId, and optional quantity
 *
 * @example
 * ```tsx
 * const [isLoading, setIsLoading] = useState(false);
 *
 * const handleBuyNow = async () => {
 *   setIsLoading(true);
 *   await buyNow([{
 *     collectionId: 'products',
 *     itemId: 'product-123',
 *     quantity: 1
 *   }]);
 *   // Note: Page will redirect, loading state won't reset
 * };
 * ```
 */
export async function buyNow(
  items: Array<{ collectionId: string; itemId: string; quantity?: number }>
): Promise<void> {
  if (items.length === 0) {
    throw new Error('At least one item is required for checkout');
  }

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
