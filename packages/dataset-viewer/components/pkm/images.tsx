'use client'

import { BASE_ASSETS_URL } from '@/lib/constants'
import { BaseAssetImg, PokeImg as BasePokeImg, PokeImgProps } from '@supeffective/ui'

export const PokeImg = ({ assetId, ...rest }: PokeImgProps) => {
  return <BasePokeImg {...rest} assetId={assetId} baseUrl={BASE_ASSETS_URL} variant="home2d-icon" />
}

export const PokeImg3d = ({ assetId, ...rest }: PokeImgProps) => {
  return <BasePokeImg {...rest} assetId={assetId} baseUrl={BASE_ASSETS_URL} variant="home3d-icon" />
}
export const GameImg = ({ assetId, ...rest }: PokeImgProps) => {
  return (
    <BaseAssetImg
      {...rest}
      assetId={`images/games/icons-square/${assetId}`}
      extension="jpg"
      baseWidth={64}
      baseHeight={64}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}
export const GameAvatarImg = ({ assetId, ...rest }: PokeImgProps) => {
  return (
    <BaseAssetImg
      {...rest}
      assetId={`images/games/icons-circle/${assetId}`}
      extension="png"
      baseWidth={64}
      baseHeight={64}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}

export const ItemImg = ({ assetId, ...rest }: PokeImgProps) => {
  return (
    <BaseAssetImg
      {...rest}
      assetId={`images/items/gen9-style/${assetId}`}
      extension="png"
      baseWidth={64}
      baseHeight={64}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}

export const RibbonImg = ({ assetId, ...rest }: PokeImgProps) => {
  return (
    <BaseAssetImg
      {...rest}
      assetId={`images/ribbons/gen9-style/${assetId}`}
      extension="png"
      baseWidth={64}
      baseHeight={64}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}
export const MarkImg = ({ assetId, ...rest }: PokeImgProps) => {
  return (
    <BaseAssetImg
      {...rest}
      assetId={`images/marks/gen9-style/${assetId}`}
      extension="png"
      baseWidth={64}
      baseHeight={64}
      baseUrl={BASE_ASSETS_URL}
    />
  )
}
