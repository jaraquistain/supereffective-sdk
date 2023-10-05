import { cn } from '@r1stack/cn'
import { InfiniteScroll as R1InfiniteScroll, InfiniteScrollProps } from '@r1stack/react'

import { css } from '@/stylesystem/css'

export function InfiniteScroll<Item>(props: InfiniteScrollProps<Item>) {
  const {
    className,
    itemProps: { className: itemClassName, ...itemRest } = {},
    ...rest
  } = props

  // TODO: use baseInfiniteScrollStyles.container as SystemStyleObject from @r1stack/react

  return (
    <R1InfiniteScroll
      {...rest}
      className={cn(
        css({
          overflow: 'auto',
        }),
        className,
      )}
      itemProps={{
        className: cn(
          css({
            contentVisibility: 'auto',
            containIntrinsicSize: 'auto',
          }),
          itemClassName,
        ),
        ...itemRest,
      }}
    />
  )
}
