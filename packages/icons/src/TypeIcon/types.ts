import type { PokeTypeId } from '@supeffective/dataset'
import type { PropsOf, Size } from '../types'

export type TypeIconCvaParams = {
  typeId: PokeTypeId
  terastal?: boolean
  filled?: boolean
  colored?: boolean
  rounded?: boolean
  size?: Size
}

export type TypeIconCvaRecipe = (params: TypeIconCvaParams) => string

export type TypeIconProps = TypeIconCvaParams & PropsOf<'span'>
