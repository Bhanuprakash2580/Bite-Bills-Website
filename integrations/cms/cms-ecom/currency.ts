import { create } from "zustand";

/**
 * Default currency code to use when the site currency is not available.
 */
export const DEFAULT_CURRENCY = "INR";

/**
 * Formats a numeric amount as a currency string.
 * Uses the browser's locale for proper formatting (symbol placement, decimals).
 *
 * @param amount - The numeric price value
 * @param currencyCode - ISO 4217 currency code (e.g., "USD", "EUR", "ILS")
 * @returns Formatted currency string (e.g., "$99.99", "€99,99", "₪99.99")
 *
 * @example
 * ```typescript
 * import { useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
 *
 * const { currency } = useCurrency();
 * formatPrice(99.99, currency ?? DEFAULT_CURRENCY) // "$99.99" (or site currency)
 * formatPrice(99.99, 'EUR') // "€99.99" or "99,99 €" depending on locale
 * formatPrice(99.99, 'ILS') // "₪99.99"
 * ```
 */
export function formatPrice(amount: number, currencyCode: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  } catch {
    // Fallback for invalid currency codes
    console.warn(`Invalid currency code: ${currencyCode}, falling back to ${DEFAULT_CURRENCY}`);
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: DEFAULT_CURRENCY,
    }).format(amount);
  }
}

type CurrencyStore = {
  currency: string | null;
  isLoading: boolean;
  error: string | null;
};

/**
 * Simple local currency store.
 * Defaults to USD and can be extended later to load from your own backend.
 */
const useCurrencyStore = create<CurrencyStore>(() => ({
  currency: DEFAULT_CURRENCY,
  isLoading: false,
  error: null,
}));

/**
 * Hook to access site currency for price formatting.
 * No provider needed - works anywhere in the app.
 *
 * Currency is fetched from the ecommerce API and represents the site's
 * configured currency from Business Manager.
 *
 * @example
 * ```tsx
 * import { useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
 *
 * const { currency } = useCurrency();
 *
 * // Format price with site currency
 * <span>{formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}</span>
 * ```
 */
export const useCurrency = () => {
  const store = useCurrencyStore();

  return {
    /** Site currency code (e.g., "USD", "EUR") */
    currency: store.currency,
    /** True while fetching currency (always false in local mode) */
    isLoading: store.isLoading,
    /** Error message if fetch failed */
    error: store.error,
  };
};
