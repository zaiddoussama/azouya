import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function calculateShipping(subtotal: number): number {
  // Free shipping over $100
  if (subtotal >= 100) return 0
  // Flat rate shipping
  return 10
}

export function calculateTotals(items: Array<{ price: number; quantity: number }>) {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = calculateShipping(subtotal)
  const discount = 0 // TODO: Implement discount logic
  const grandTotal = subtotal + shipping - discount
  
  return {
    subtotal,
    shipping,
    discount,
    grandTotal,
  }
}
