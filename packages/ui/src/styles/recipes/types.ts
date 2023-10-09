import type { Size } from '@/lib/types'

export type FullGridRecipeProps = {
  size: Size
  autoFill?: boolean
  boxGroup?: boolean
  cols?: 6 | 5
  rows?: 5 | 4
  className?: string
  [key: string]: any
}
