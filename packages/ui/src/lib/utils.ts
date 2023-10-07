import clsx from 'clsx'

export function cn(...args: clsx.ClassValue[]): string {
  return clsx(...args)
}
