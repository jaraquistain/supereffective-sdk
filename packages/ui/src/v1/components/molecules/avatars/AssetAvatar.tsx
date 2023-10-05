import { cn } from '@r1stack/cn'
import React from 'react'

import type { AssetImgProps } from '@/v1/components/molecules'
import type { ResponsiveSize } from '@/v1/components/utility'
import { css, cva } from '@/v1/css'

export type AssetAvatarProps<V = string, P extends AssetImgProps<V> = AssetImgProps<V>> = AssetImgProps<V> & {
  hoverable?: boolean
  clickable?: boolean
  size?: ResponsiveSize
  rounded?: true | 'soft'
  condensed?: boolean
  filled?: boolean
  component: React.FC<P>
}

export type AssetAvatarPropsOf<P extends AssetImgProps> = Omit<AssetAvatarProps<P['variant']>, 'component'> & P

const sizeClasses = cva({
  base: {
    width: '4rem',
    aspectRatio: 1,
  },
  variants: {
    size: {
      xs: {
        width: '2rem',
      },
      sm: {
        width: '3rem',
      },
      md: {
        width: '4rem',
      },
      lg: {
        width: '6rem',
      },
      xl: {
        width: '8rem',
      },
      auto: {
        width: 'auto',
      },
      full: {
        width: '100%',
      },
    },
    rounded: {
      true: {
        rounded: 'full',
      },
      soft: {
        rounded: '0.5rem',
      },
    },
  },
})

export function AssetAvatar<V = string>(props: AssetAvatarProps<V>): JSX.Element {
  const {
    className,
    component: AssetComponent,
    hoverable,
    condensed,
    size,
    rounded,
    filled,
    clickable,
    ...rest
  } = props

  const aspectRatioSquare = css({
    aspectRatio: 1,
  })

  const aspectRatioPortrait = css({
    aspectRatio: 56 / 68, // r = h / w
  })

  return (
    <AssetComponent
      data-hoverable={hoverable}
      data-clickable={clickable}
      className={cn(
        css({
          // overflow: 'hidden',
          maxWidth: 'full',
          boxSizing: 'border-box',
          pointerEvents: 'initial',
          padding: 0,
        }),
        sizeClasses({ size, rounded }),
        [filled, css({ bg: 'rgba(0,0,0,0.5)' })],
        [
          !condensed,
          css({
            padding: '4px',
          }),
        ],
        [
          hoverable,
          css({
            transition: 'transform 0.2s ease-in-out',
            transitionProperty: 'transform, background',
            '&:hover': { transform: 'scale(1.1)' },
          }),
        ],
        [
          filled && hoverable,
          css({
            '&:hover': { bg: 'rgba(0,0,0,1)' },
          }),
        ],
        [
          clickable,
          css({
            transition: 'transform 0.2s ease-in-out',
            cursor: 'pointer',
            '&:active': { transform: 'scale(0.9)' },
          }),
        ],
        className,
      )}
      imgClassName={css({
        aspectRatio: props.variant === 'gen8-icon' ? aspectRatioPortrait : aspectRatioSquare,
        width: '100%',
        height: 'auto',
        imageRendering: 'pixelated',
        padding: 0,
      })}
      {...rest}
    />
  )
}
