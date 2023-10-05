import type { ComponentPropsWithoutRef } from 'react'

export type BaseAssetImgProps<V = string> = {
  assetId: string | null
  baseUrl?: string
  baseWidth?: number
  baseHeight?: number
  extension?: string
  fallback?: string | URL
  variant?: V
  imgClassName?: string
} & ComponentPropsWithoutRef<'span'>

export type PokeImgProps = {
  assetId: string | null
  variant?:
    | 'gen8-icon'
    | 'gen8-icon-trimmed'
    | 'home3d-icon'
    | 'home3d-icon-trimmed'
    | 'home2d-icon'
    | 'home2d-icon-trimmed'
  shiny?: boolean
} & BaseAssetImgProps
