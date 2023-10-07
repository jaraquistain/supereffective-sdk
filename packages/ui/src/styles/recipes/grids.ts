import { cn } from '@/lib/utils'
import styles from './grids.module.scss'
import type { FullGridRecipeProps } from './types'

export function gridRecipe(options: FullGridRecipeProps): string {
  return cn(
    styles.grid,
    options.autoFill && styles.auto,
    options.cols && styles[`box-${options.cols}x`],
    options.cols && options.rows && styles[`box-${options.cols}x${options.rows}`],
    options.size && styles[options.size],
    options.className,
  )
}
