import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createQueryString(obj: Record<string, any>): string {
  return Object.keys(obj).length > 0 ? `?${new URLSearchParams(obj as Record<string, string>)}` : ''
}
