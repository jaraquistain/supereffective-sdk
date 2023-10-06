import { cn } from '@r1stack/cn'
import styles from './grids.module.scss'
import type { FullGridRecipeProps } from './types'

export function gridRecipe(options: FullGridRecipeProps): string {
  return cn(
    styles.grid,
    [options.autoFill, styles.auto],
    options.cols ? styles[`box-${options.cols}x`] : null,
    options.cols && options.rows ? styles[`box-${options.cols}x${options.rows}`] : null,
    options.size ? styles[options.size] : null,
    options.className,
  )
}
