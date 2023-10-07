'use client'

import { BASE_IMAGE_URL } from '@/lib/dataset-client'
import { PokeImg as BasePokeImg, PokeImgProps } from '@supeffective/ui'

export const PokeImg = ({ assetId, ...rest }: PokeImgProps) => {
  return <BasePokeImg {...rest} assetId={assetId} baseUrl={BASE_IMAGE_URL} variant="home2d-icon" />
}

export const PokeImg3d = ({ assetId, ...rest }: PokeImgProps) => {
  return <BasePokeImg {...rest} assetId={assetId} baseUrl={BASE_IMAGE_URL} variant="home3d-icon" />
}
