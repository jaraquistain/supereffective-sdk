import { cn } from '@r1stack/cn'

import { type PokeTypeId, pokemonTypesMap } from '@supeffective/dataset'
import { Teratype } from '@supeffective/icons'

import type { PropsOf, Size } from '@/components/utility/types'

import { pokemonTypeComponents } from './TypeIcon.icons'
import { typeIconGlyphRecipe, typeIconRecipe, typeTeraIconBgRecipe } from './TypeIcon.styles'

export type TypeIconProps = {
  typeId: PokeTypeId | string
  terastal?: boolean
  filled?: boolean
  colored?: boolean
  rounded?: boolean
  size?: Size
} & PropsOf<'span'>

export function TypeIcon(props: TypeIconProps) {
  const { typeId, terastal, filled, colored, rounded, size = 'sm', className, ...rest } = props
  const pokeType = pokemonTypesMap.get(typeId)
  if (!pokeType) {
    throw new Error(`No type with id ${typeId}`)
  }

  const componentConfig = pokemonTypeComponents[pokeType.id]
  if (!componentConfig) {
    throw new Error(`No SVG icon for type ${pokeType.id}`)
  }

  const TypeComponent = componentConfig.component
  const terastalBgClass = typeTeraIconBgRecipe({
    typeId: pokeType.id as any,
    filled,
    colored,
    rounded,
    terastal,
    size,
  })

  return (
    <span
      title={pokeType.name}
      data-terastal={terastal ? true : undefined}
      data-filled={filled ? true : undefined}
      data-type={pokeType.id}
      className={cn(
        typeIconRecipe({
          typeId: pokeType.id as any,
          filled,
          colored,
          rounded,
          terastal,
          size,
        }),
        className,
      )}
      {...rest}
    >
      {terastal && <Teratype className={cn(terastalBgClass)} />}
      <TypeComponent
        className={cn(
          typeIconGlyphRecipe({
            typeId: pokeType.id as any,
            filled,
            colored,
            rounded,
            terastal,
            size,
          }),
        )}
      />
    </span>
  )
}
