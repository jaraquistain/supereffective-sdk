import { cn } from '@r1stack/cn'
import type { ComponentPropsWithoutRef } from 'react'
import styles from './full-grid.module.scss'

export function FullGrid({ children, className, ...rest }: ComponentPropsWithoutRef<'div'>): JSX.Element {
  return (
    <div className={cn(styles.grid, className)} {...rest}>
      {children}
    </div>
  )
}
