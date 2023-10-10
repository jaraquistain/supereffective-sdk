'use client'

import { PKM_DEFAULT_ASSETS_URL } from '../../../constants'
import { AssetImgFile, type AssetImgProps } from './AssetImgFile'

export type PokeImgFileProps = {
  assetId: string | null
  variant?:
    | 'gen8-icon'
    | 'gen8-icon-trimmed'
    | 'home3d-icon'
    | 'home3d-icon-trimmed'
    | 'home2d-icon'
    | 'home2d-icon-trimmed'
  shiny?: boolean
} & AssetImgProps

export function PokeImgFile({
  assetId,
  shiny = false,
  baseUrl = PKM_DEFAULT_ASSETS_URL,
  variant = 'home3d-icon',
  baseWidth = 64,
  baseHeight = 64,
  ...rest
}: PokeImgFileProps): JSX.Element {
  const newBaseUrl = `${baseUrl}/images/pokemon/${variant}/${shiny ? 'shiny' : 'regular'}`
  // const newAssetId = assetId || '0000-unknown'

  let width = baseWidth
  let height = baseHeight
  if (variant === 'gen8-icon') {
    width = 68
    height = 56
  }

  return <AssetImgFile baseUrl={newBaseUrl} assetId={assetId} baseWidth={width} baseHeight={height} {...rest} />
}
