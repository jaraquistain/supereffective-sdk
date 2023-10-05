import { cn } from '@r1stack/cn'
import type { ComponentPropsWithoutRef } from 'react'

import { css } from '@/v1/css'

import { Img } from '@/v1/components/atoms/Img'
import { getUiAssetsUrl } from '../../../../baseUrls'

export type AssetImgProps<V = string> = {
  assetId: string | null
  baseUrl?: string
  baseWidth?: number
  baseHeight?: number
  extension?: string
  fallback?: string | URL
  variant?: V
  imgClassName?: string
} & ComponentPropsWithoutRef<'span'>

export function AssetImgFile({
  className,
  imgClassName,
  assetId,
  fallback,
  variant,
  title,
  baseUrl = getUiAssetsUrl(),
  baseWidth = 64,
  baseHeight = 64,
  extension = 'png',
  children,
  ...rest
}: AssetImgProps): JSX.Element {
  function _renderImg() {
    const imgClasses = cn(
      css({
        position: 'relative',
        display: 'block',
        maxWidth: 'full',
        height: 'auto',
        pointerEvents: 'none',
      }),
      imgClassName,
    )

    if (!assetId) {
      return <span className={cn(imgClasses, 'empty-asset-img')}>&nbsp;</span>
    }

    const imgSrc = `${baseUrl}/${assetId}.${extension}`

    return (
      <Img
        data-asset={String(assetId)}
        src={imgSrc}
        loading="lazy"
        alt={title ?? assetId}
        width={baseWidth}
        height={baseHeight}
        fallback={fallback}
        className={imgClasses}
      />
    )
  }

  return (
    <span
      title={title ?? assetId ?? ''}
      data-variant={variant}
      className={cn(
        css({
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '1rem',
          maxWidth: 'full',
          height: 'auto',
          fontSize: 'xs',
          lineHeight: '1',
          fontStyle: 'normal',
          userSelect: 'none',
        }),
        className,
      )}
      {...rest}
    >
      {_renderImg()}
      {children}
    </span>
  )
}
