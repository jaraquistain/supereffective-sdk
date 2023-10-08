import { getUiAssetsUrl } from '@/lib/baseUrls'
import { cn } from '@/lib/utils'
import { Img } from '../primitives/img'
import styles from './base-img.module.scss'
import type { BaseAssetImgProps } from './types'

export function BaseAssetImg({
  className,
  imgClassName,
  assetId,
  fallback,
  variant,
  title,
  baseUrl,
  baseWidth = 64,
  baseHeight = 64,
  extension = 'png',
  children,
  ...rest
}: BaseAssetImgProps): JSX.Element {
  function _renderImg() {
    const imgClasses = cn(styles.img, imgClassName)

    if (!assetId) {
      return <span className={cn(imgClasses, 'empty-asset-img')}>&nbsp;</span>
    }

    const _baseUrl = baseUrl ?? getUiAssetsUrl()
    const imgSrc = `${_baseUrl}/${assetId}.${extension}`

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
    <span title={title ?? assetId ?? ''} data-variant={variant} className={cn(styles.wrapper, className)} {...rest}>
      {_renderImg()}
      {children}
    </span>
  )
}
