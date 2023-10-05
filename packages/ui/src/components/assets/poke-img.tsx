'use client'

import { getUiAssetsUrl } from '@/lib/baseUrls'
import { BaseAssetImg } from './base-img'
import type { PokeImgProps } from './types'

export function PokeImg({
  assetId,
  baseUrl,
  shiny = false,
  variant = 'home3d-icon',
  baseWidth = 64,
  baseHeight = 64,
  ...rest
}: PokeImgProps): JSX.Element {
  const _baseUrl = baseUrl ?? getUiAssetsUrl()
  const newBaseUrl = `${_baseUrl}/images/pokemon/${variant}/${shiny ? 'shiny' : 'regular'}`
  // const newAssetId = assetId || '0000-unknown'

  let width = baseWidth
  let height = baseHeight
  if (variant === 'gen8-icon') {
    width = 68
    height = 56
  }

  return <BaseAssetImg baseUrl={newBaseUrl} assetId={assetId} baseWidth={width} baseHeight={height} {...rest} />
}
