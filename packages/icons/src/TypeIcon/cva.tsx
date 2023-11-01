import { cn } from '../utils'
import type { TypeIconCvaParams } from './types'
export function typeIconGlyphRecipe(params: TypeIconCvaParams) {
  return baseIconRecipe('pkm-type-glyph', params)
}

export function typeTeraIconBgRecipe(params: TypeIconCvaParams) {
  return baseIconRecipe('pkm-type-teraglyph', params)
}

export function typeIconRecipe(params: TypeIconCvaParams) {
  return baseIconRecipe('pkm-type', params)
}

export function baseIconRecipe(baseName: string, params: TypeIconCvaParams) {
  const classNames = []

  if (params.colored) {
    classNames.push(`${baseName}--colored`)
  } else {
    classNames.push(`${baseName}--not-colored`)
  }

  if (params.filled) {
    classNames.push(`${baseName}--filled`)
  } else {
    classNames.push(`${baseName}--not-filled`)
  }

  if (params.terastal) {
    classNames.push(`${baseName}--tera`)
  } else {
    classNames.push(`${baseName}--not-tera`)
  }

  if (params.rounded) {
    classNames.push(`${baseName}--rounded`)
  } else {
    classNames.push(`${baseName}--not-rounded`)
  }

  if (params.size) {
    classNames.push(`${baseName}--size-${params.size}`)
  } else {
    classNames.push(`${baseName}--size-default`)
  }

  classNames.push(`${baseName}-${params.typeId}`)

  return cn(baseName, ...classNames)
}
