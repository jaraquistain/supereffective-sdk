import { PropsOf } from '@/lib/types'
import { cn } from '@/lib/utils'
import { FullGridRecipeProps, gridRecipe } from '@/styles'
import { ReactElement } from 'react'

type GridProps = FullGridRecipeProps & PropsOf<'div'>

export function GridFull({ className, children, size, ...rest }: GridProps): ReactElement {
  return (
    <div
      className={gridRecipe({
        className: cn('gap-3 sm:gap-4 rounded-md border my-6 p-2 sm:p-4 overflow-auto', className),
        size: size ?? 'lg',
        autoFill: true,
        ...rest,
      })}
    >
      {children}
    </div>
  )
}

export function GridBoxGroup({ className, children, size, ...rest }: GridProps): ReactElement {
  return (
    <div
      className={gridRecipe({
        className: cn('w-full items-stretch gap-3 sm:gap-4 rounded-md p-0 sm:p-4 sm:border my-6', className),
        size: size ?? 'xl',
        boxGroup: true,
        ...rest,
      })}
    >
      {children}
    </div>
  )
}
