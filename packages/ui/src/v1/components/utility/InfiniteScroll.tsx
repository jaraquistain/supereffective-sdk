import { cn } from '@r1stack/cn'

import { css } from '@/v1/css'
import { BaseInfiniteScroll, type BaseInfiniteScrollProps } from './BaseInfiniteScroll'

export function InfiniteScroll<Item>(props: BaseInfiniteScrollProps<Item>) {
  const {
    className,
    itemProps: { className: itemClassName, ...itemRest } = {},
    ...rest
  } = props

  // TODO: use baseInfiniteScrollStyles.container as SystemStyleObject from base/components/utils

  return (
    <BaseInfiniteScroll
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
