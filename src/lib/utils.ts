import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
  }).format(price)
}

export function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `BB-${timestamp}${random}`
}

export function getBakeryImage(product: any) {
  return product?.images?.[0] || 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=85'
}

export function getHeroImage() {
  return 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&q=85'
}
